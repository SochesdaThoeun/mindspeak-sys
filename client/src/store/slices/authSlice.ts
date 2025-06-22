import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { authService } from '../services/authService'
import {
  AuthState,
  LoginPayload,
  RegisterPayload,
  UpdateProfilePayload,
  User
} from '../types/auth'

// Define a more specific error type for API errors
interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
      error?: {
        message?: string;  
        errors?: Record<string, string[]>;
      };
    };
    status?: number;
  };
  message?: string;
}

// Helper function to extract all error messages from API response
const extractErrorMessages = (apiError: ApiError): string[] => {
  const messages: string[] = [];
  
  // Check for nested error structure first
  const errorData = apiError.response?.data?.error || apiError.response?.data;
  
  if (errorData?.errors) {
    // Extract all validation errors
    Object.values(errorData.errors).forEach(errorArray => {
      if (Array.isArray(errorArray)) {
        messages.push(...errorArray);
      }
    });
  }
  
  // Only add main message if no validation errors were found
  if (messages.length === 0 && errorData?.message) {
    messages.push(errorData.message);
  }
  
  // Fallback to generic API error message
  if (messages.length === 0 && apiError.message) {
    messages.push(apiError.message);
  }
  
  return messages.length > 0 ? messages : ['An unexpected error occurred'];
};

// Initial state with updated error type
const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null
}

// Check authentication status
export const checkAuthStatus = createAsyncThunk(
  'auth/checkAuthStatus',
  async (_, { rejectWithValue }) => {
    try {
      console.log('📤 Auth Slice: Checking authentication status')
      const isAuthenticated = await authService.checkAuthStatus()
      if (isAuthenticated) {
        const userProfile = await authService.getUserProfile()
        return userProfile.data.user
      }
      return null
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('❌ Auth Slice: Auth status check failed', apiError.message)
      return rejectWithValue({ errors: ['Failed to check authentication status'] })
    }
  }
)

// Async thunks for auth actions
export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      console.log('📤 Auth Slice: Starting user registration')
      const response = await authService.register(payload)
      return response.data
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('❌ Auth Slice: Registration failed', apiError.response?.data || apiError.message)
      
      // Extract all error messages from API response
      const errorMessages = extractErrorMessages(apiError)
      return rejectWithValue({ errors: errorMessages })
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      console.log('📤 Auth Slice: Starting user login')
      const response = await authService.login(payload)
      return response.data
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('❌ Auth Slice: Login failed', apiError.response?.data || apiError.message)
      
      // Extract all error messages from API response
      const errorMessages = extractErrorMessages(apiError)
      return rejectWithValue({ errors: errorMessages })
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    try {
      console.log('📤 Auth Slice: Starting user logout')
      await authService.logout()
      return true
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('❌ Auth Slice: Logout failed', apiError.response?.data || apiError.message)
      // Still return success since local logout should happen regardless
      return true
    }
  }
)

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      console.log('📤 Auth Slice: Fetching user profile')
      const response = await authService.getUserProfile()
      return response.data.user
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('❌ Auth Slice: Get profile failed', apiError.response?.data || apiError.message)
      const errorMessages = extractErrorMessages(apiError)
      return rejectWithValue({ errors: errorMessages })
    }
  }
)

export const updateUserProfile = createAsyncThunk(
  'auth/updateProfile',
  async (payload: UpdateProfilePayload, { rejectWithValue }) => {
    try {
      console.log('📤 Auth Slice: Updating user profile')
      const response = await authService.updateUserProfile(payload)
      return response.data.user
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('❌ Auth Slice: Update profile failed', apiError.response?.data || apiError.message)
      const errorMessages = extractErrorMessages(apiError)
      return rejectWithValue({ errors: errorMessages })
    }
  }
)

export const refreshUserData = createAsyncThunk(
  'auth/refreshUserData',  
  async (_, { rejectWithValue }) => {
    try {
      console.log('📤 Auth Slice: Refreshing user data')
      const response = await authService.refreshUser()
      if (response) {
        return response.data.user
      }
      throw new Error('Failed to refresh user data')
    } catch (error: unknown) {
      const apiError = error as ApiError
      console.error('❌ Auth Slice: Refresh user data failed', apiError.message)
      return rejectWithValue({ errors: ['Failed to refresh user data'] })
    }
  }
)

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Clear error
    clearError: (state) => {
      state.error = null
      console.log('✅ Auth Slice: Error cleared')
    },
    // Clear auth data
    clearAuth: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      state.error = null
      console.log('✅ Auth Slice: Auth data cleared')
    },
    // Set loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    // Set user data (useful for immediate updates)
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      console.log('✅ Auth Slice: User data updated', { userId: action.payload.id, userName: action.payload.name })
    }
  },
  extraReducers: (builder) => {
    // Check auth status
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true
        console.log('⏳ Auth Slice: Auth status check pending')
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isLoading = false
        if (action.payload) {
          state.user = action.payload
          state.isAuthenticated = true
          console.log('✅ Auth Slice: Auth status check successful - user authenticated', {
            user: action.payload.name
          })
        } else {
          state.user = null
          state.isAuthenticated = false
          console.log('✅ Auth Slice: Auth status check successful - user not authenticated')
        }
        state.error = null
      })
      .addCase(checkAuthStatus.rejected, (state, action) => {
        state.isLoading = false
        state.user = null
        state.isAuthenticated = false
        const payload = action.payload as { message?: string; errors?: string[] } | undefined;
        state.error = payload?.errors || [payload?.message || 'Auth status check failed'];
        console.log('❌ Auth Slice: Auth status check rejected', state.error)
      })

    // Register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        console.log('⏳ Auth Slice: Registration pending')
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
        console.log('✅ Auth Slice: Registration successful', {
          user: action.payload.user.name,
          authenticated: true
        })
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        const payload = action.payload as { errors?: string[] } | undefined;
        state.error = payload?.errors || ['Registration failed'];
        console.log('❌ Auth Slice: Registration rejected', state.error)
      })

    // Login user
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true
        state.error = null
        console.log('⏳ Auth Slice: Login pending')
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        state.error = null
        console.log('✅ Auth Slice: Login successful', {
          user: action.payload.user.name,
          authenticated: true
        })
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false
        const payload = action.payload as { errors?: string[] } | undefined;
        state.error = payload?.errors || ['Login failed'];
        console.log('❌ Auth Slice: Login rejected', state.error)
      })

    // Logout user
    builder
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true
        console.log('⏳ Auth Slice: Logout pending')
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
        console.log('✅ Auth Slice: Logout successful')
      })
      .addCase(logoutUser.rejected, (state) => {
        state.isLoading = false
        // Clear auth data even if logout failed on server
        state.user = null
        state.token = null
        state.isAuthenticated = false
        state.error = null
        console.log('⚠️ Auth Slice: Logout failed on server but local data cleared')
      })

    // Get user profile
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true
        console.log('⏳ Auth Slice: Get profile pending')
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
        console.log('✅ Auth Slice: Get profile successful', {
          user: action.payload.name
        })
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false
        const payload = action.payload as { message?: string; errors?: string[] } | undefined;
        state.error = payload?.errors || [payload?.message || 'Failed to fetch profile'];
        console.log('❌ Auth Slice: Get profile rejected', state.error)
      })

    // Update user profile
    builder
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true
        console.log('⏳ Auth Slice: Update profile pending')
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.error = null
        console.log('✅ Auth Slice: Update profile successful', {
          user: action.payload.name
        })
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false
        const payload = action.payload as { message?: string; errors?: string[] } | undefined;
        state.error = payload?.errors || [payload?.message || 'Failed to update profile'];
        console.log('❌ Auth Slice: Update profile rejected', state.error)
      })

    // Refresh user data
    builder
      .addCase(refreshUserData.pending, () => {
        console.log('⏳ Auth Slice: Refresh user data pending')
      })
      .addCase(refreshUserData.fulfilled, (state, action) => {
        state.user = action.payload
        state.error = null
        console.log('✅ Auth Slice: Refresh user data successful', {
          user: action.payload.name
        })
      })
      .addCase(refreshUserData.rejected, (state, action) => {
        const payload = action.payload as { message?: string; errors?: string[] } | undefined;
        state.error = payload?.errors || [payload?.message || 'Failed to refresh user data'];
        console.log('❌ Auth Slice: Refresh user data rejected', state.error)
      })
  }
})

// Export actions
export const { clearError, clearAuth, setLoading, setUser } = authSlice.actions

// Export reducer
export default authSlice.reducer 