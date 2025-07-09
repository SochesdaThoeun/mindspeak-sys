import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  initialAdminState,
  GetPendingPostsParams,
  GetApprovedPostsParams,
  GetRejectedPostsParams,
  ApprovePostPayload,
  RejectPostPayload,
  GetPendingCommentsParams,
  ApproveCommentPayload,
  RejectCommentPayload,
  GetAdminUserMessagesParams,
  AdminReplyToMessagePayload,
  UpdateMessageStatusPayload,
  SetAdminPostFiltersPayload,
  SetAdminCommentFiltersPayload,
  SetAdminMessageFiltersPayload,
  SetAdminUserFiltersPayload,
  GetAllUsersParams,
  GetAllPostsParams,
  UpdateAdminPasswordPayload,
  GetAllFaqsParams,
  CreateFaqPayload,
  UpdateFaqPayload,
} from '../types/admin';
import * as adminService from '../services/adminService';

// Define a more specific error type for API errors
interface ApiError {
  response?: {
    data?: {
      message?: string;
      errors?: Record<string, string[]>;
    };
    status?: number;
  };
  message?: string;
}

// ============================================================================
// ASYNC THUNKS - DASHBOARD ANALYTICS
// ============================================================================

/**
 * Get dashboard overview with key statistics
 */
export const fetchDashboardOverview = createAsyncThunk(
  'admin/fetchDashboardOverview',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching dashboard overview...');
      const response = await adminService.getDashboardOverview();
      console.log('✅ [Admin] Dashboard overview fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching dashboard overview:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch dashboard overview');
    }
  }
);

/**
 * Get weekly statistics for trends
 */
export const fetchWeeklyStatistics = createAsyncThunk(
  'admin/fetchWeeklyStatistics',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching weekly statistics...');
      const response = await adminService.getWeeklyStatistics();
      console.log('✅ [Admin] Weekly statistics fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching weekly statistics:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch weekly statistics');
    }
  }
);

/**
 * Get engagement statistics
 */
export const fetchEngagementStatistics = createAsyncThunk(
  'admin/fetchEngagementStatistics',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching engagement statistics...');
      const response = await adminService.getEngagementStatistics();
      console.log('✅ [Admin] Engagement statistics fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching engagement statistics:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch engagement statistics');
    }
  }
);

// ============================================================================
// ASYNC THUNKS - USER MANAGEMENT
// ============================================================================

/**
 * Get all users with statistics and pagination
 */
export const fetchAllUsers = createAsyncThunk(
  'admin/fetchAllUsers',
  async (params: GetAllUsersParams = {}, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching all users...', params);
      const response = await adminService.getAllUsers(params);
      console.log('✅ [Admin] All users fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching all users:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch all users');
    }
  }
);

/**
 * Update user details including role (make admin)
 */
export const updateUser = createAsyncThunk(
  'admin/updateUser',
  async (payload: { userId: number; name?: string; email?: string; role?: 'user' | 'moderator' | 'admin'; bio?: string; is_anonymous?: boolean }, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Updating user...', payload);
      const response = await adminService.updateUser(payload);
      console.log('✅ [Admin] User updated successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error updating user:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to update user');
    }
  }
);

/**
 * Delete user permanently
 */
export const deleteUser = createAsyncThunk(
  'admin/deleteUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Deleting user...', userId);
      const response = await adminService.deleteUser(userId);
      console.log('✅ [Admin] User deleted successfully:', response);
      return { userId, response };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error deleting user:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to delete user');
    }
  }
);

// ============================================================================
// ASYNC THUNKS - POST MANAGEMENT
// ============================================================================

/**
 * Get pending posts for moderation
 */
export const fetchPendingPosts = createAsyncThunk(
  'admin/fetchPendingPosts',
  async (params: GetPendingPostsParams = {}, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching pending posts...', params);
      const response = await adminService.getPendingPosts(params);
      console.log('✅ [Admin] Pending posts fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching pending posts:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch pending posts');
    }
  }
);

/**
 * Get approved posts for admin review
 */
export const fetchApprovedPosts = createAsyncThunk(
  'admin/fetchApprovedPosts',
  async (params: GetApprovedPostsParams = {}, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching approved posts...', params);
      const response = await adminService.getApprovedPosts(params);
      console.log('✅ [Admin] Approved posts fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching approved posts:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch approved posts');
    }
  }
);

/**
 * Get rejected posts for admin review
 */
export const fetchRejectedPosts = createAsyncThunk(
  'admin/fetchRejectedPosts',
  async (params: GetRejectedPostsParams = {}, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching rejected posts...', params);
      const response = await adminService.getRejectedPosts(params);
      console.log('✅ [Admin] Rejected posts fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching rejected posts:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch rejected posts');
    }
  }
);

/**
 * Get all posts with filtering (no status restriction)
 */
export const fetchAllPosts = createAsyncThunk(
  'admin/fetchAllPosts',
  async (params: GetAllPostsParams = {}, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching all posts...', params);
      const response = await adminService.getAllPosts(params);
      console.log('✅ [Admin] All posts fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching all posts:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch all posts');
    }
  }
);

/**
 * Approve a pending post
 */
export const approvePost = createAsyncThunk(
  'admin/approvePost',
  async (payload: ApprovePostPayload, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Approving post...', payload);
      const response = await adminService.approvePost(payload);
      console.log('✅ [Admin] Post approved successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error approving post:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to approve post');
    }
  }
);

/**
 * Reject a pending post
 */
export const rejectPost = createAsyncThunk(
  'admin/rejectPost',
  async (payload: RejectPostPayload, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Rejecting post...', payload);
      const response = await adminService.rejectPost(payload);
      console.log('✅ [Admin] Post rejected successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error rejecting post:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to reject post');
    }
  }
);

/**
 * Delete a post permanently
 */
export const deletePost = createAsyncThunk(
  'admin/deletePost',
  async (postId: number, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Deleting post...', postId);
      const response = await adminService.deletePost(postId);
      console.log('✅ [Admin] Post deleted successfully:', response);
      return { postId, response };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error deleting post:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to delete post');
    }
  }
);

// ============================================================================
// ASYNC THUNKS - COMMENT MANAGEMENT
// ============================================================================

/**
 * Get pending comments for moderation
 */
export const fetchPendingComments = createAsyncThunk(
  'admin/fetchPendingComments',
  async (params: GetPendingCommentsParams = {}, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching pending comments...', params);
      const response = await adminService.getPendingComments(params);
      console.log('✅ [Admin] Pending comments fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching pending comments:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch pending comments');
    }
  }
);

/**
 * Approve a pending comment
 */
export const approveComment = createAsyncThunk(
  'admin/approveComment',
  async (payload: ApproveCommentPayload, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Approving comment...', payload);
      const response = await adminService.approveComment(payload);
      console.log('✅ [Admin] Comment approved successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error approving comment:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to approve comment');
    }
  }
);

/**
 * Reject a pending comment
 */
export const rejectComment = createAsyncThunk(
  'admin/rejectComment',
  async (payload: RejectCommentPayload, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Rejecting comment...', payload);
      const response = await adminService.rejectComment(payload);
      console.log('✅ [Admin] Comment rejected successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error rejecting comment:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to reject comment');
    }
  }
);

// ============================================================================
// ASYNC THUNKS - MESSAGE MANAGEMENT
// ============================================================================

/**
 * Get all user messages for admin review
 */
export const fetchAdminUserMessages = createAsyncThunk(
  'admin/fetchAdminUserMessages',
  async (params: GetAdminUserMessagesParams = {}, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching user messages...', params);
      const response = await adminService.getAdminUserMessages(params);
      console.log('✅ [Admin] User messages fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching user messages:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch user messages');
    }
  }
);

/**
 * Reply to a user message
 */
export const replyToUserMessage = createAsyncThunk(
  'admin/replyToUserMessage',
  async (payload: AdminReplyToMessagePayload, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Replying to user message...', payload);
      const response = await adminService.replyToMessage(payload);
      console.log('✅ [Admin] Reply sent successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error replying to message:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to send reply');
    }
  }
);

/**
 * Update message status (read/responded)
 */
export const updateMessageStatus = createAsyncThunk(
  'admin/updateMessageStatus',
  async (payload: UpdateMessageStatusPayload, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Updating message status...', payload);
      const response = await adminService.updateMessageStatus(payload);
      console.log('✅ [Admin] Message status updated successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error updating message status:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to update message status');
    }
  }
);

// ============================================================================
// ASYNC THUNKS - UTILITY
// ============================================================================

/**
 * Get admin statistics
 */
export const fetchAdminStats = createAsyncThunk(
  'admin/fetchAdminStats',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching admin statistics...');
      const response = await adminService.getAdminStats();
      console.log('✅ [Admin] Admin statistics fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching admin statistics:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch admin statistics');
    }
  }
);

/**
 * Update admin password
 */
export const updateAdminPassword = createAsyncThunk(
  'admin/updateAdminPassword',
  async (payload: UpdateAdminPasswordPayload, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Updating admin password...');
      const response = await adminService.updateAdminPassword(payload);
      console.log('✅ [Admin] Admin password updated successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error updating admin password:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to update admin password');
    }
  }
);

// ============================================================================
// ASYNC THUNKS - FAQ MANAGEMENT
// ============================================================================

/**
 * Get all FAQs with pagination and filtering
 */
export const fetchAllFaqs = createAsyncThunk(
  'admin/fetchAllFaqs',
  async (params: GetAllFaqsParams = {}, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching all FAQs...', params);
      const response = await adminService.getAllFaqs(params);
      console.log('✅ [Admin] All FAQs fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching all FAQs:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch FAQs');
    }
  }
);

/**
 * Create a new FAQ
 */
export const createFaq = createAsyncThunk(
  'admin/createFaq',
  async (payload: CreateFaqPayload, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Creating FAQ...', payload);
      const response = await adminService.createFaq(payload);
      console.log('✅ [Admin] FAQ created successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error creating FAQ:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to create FAQ');
    }
  }
);

/**
 * Update an existing FAQ
 */
export const updateFaq = createAsyncThunk(
  'admin/updateFaq',
  async (payload: UpdateFaqPayload, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Updating FAQ...', payload);
      const response = await adminService.updateFaq(payload);
      console.log('✅ [Admin] FAQ updated successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error updating FAQ:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to update FAQ');
    }
  }
);

/**
 * Delete a FAQ
 */
export const deleteFaq = createAsyncThunk(
  'admin/deleteFaq',
  async (faqId: number, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Deleting FAQ...', faqId);
      const response = await adminService.deleteFaq(faqId);
      console.log('✅ [Admin] FAQ deleted successfully:', response);
      return { faqId, response };
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error deleting FAQ:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to delete FAQ');
    }
  }
);

/**
 * Get FAQ statistics
 */
export const fetchFaqStatistics = createAsyncThunk(
  'admin/fetchFaqStatistics',
  async (_, { rejectWithValue }) => {
    try {
      console.log('🔄 [Admin] Fetching FAQ statistics...');
      const response = await adminService.getFaqStatistics();
      console.log('✅ [Admin] FAQ statistics fetched successfully:', response);
      return response;
    } catch (error: unknown) {
      const apiError = error as ApiError;
      console.error('❌ [Admin] Error fetching FAQ statistics:', apiError);
      return rejectWithValue(apiError.response?.data?.message || apiError.message || 'Failed to fetch FAQ statistics');
    }
  }
);

// ============================================================================
// ADMIN SLICE
// ============================================================================

const adminSlice = createSlice({
  name: 'admin',
  initialState: initialAdminState,
  reducers: {
    // Filter Actions
    setPostFilters: (state, action: PayloadAction<SetAdminPostFiltersPayload>) => {
      state.filters.posts = { ...state.filters.posts, ...action.payload };
      console.log('🔧 [Admin] Post filters updated:', state.filters.posts);
    },

    setCommentFilters: (state, action: PayloadAction<SetAdminCommentFiltersPayload>) => {
      state.filters.comments = { ...state.filters.comments, ...action.payload };
      console.log('🔧 [Admin] Comment filters updated:', state.filters.comments);
    },

    setMessageFilters: (state, action: PayloadAction<SetAdminMessageFiltersPayload>) => {
      state.filters.messages = { ...state.filters.messages, ...action.payload };
      console.log('🔧 [Admin] Message filters updated:', state.filters.messages);
    },

    setUserFilters: (state, action: PayloadAction<SetAdminUserFiltersPayload>) => {
      state.filters.users = { ...state.filters.users, ...action.payload };
      console.log('🔧 [Admin] User filters updated:', state.filters.users);
    },

    // Clear States
    clearPendingPosts: (state) => {
      state.pendingPosts = [];
      state.pagination.pendingPosts = null;
      console.log('🧹 [Admin] Pending posts cleared');
    },

    clearApprovedPosts: (state) => {
      state.approvedPosts = [];
      state.pagination.approvedPosts = null;
      console.log('🧹 [Admin] Approved posts cleared');
    },

    clearRejectedPosts: (state) => {
      state.rejectedPosts = [];
      state.pagination.rejectedPosts = null;
      console.log('🧹 [Admin] Rejected posts cleared');
    },

    clearPendingComments: (state) => {
      state.pendingComments = [];
      state.pagination.pendingComments = null;
      console.log('🧹 [Admin] Pending comments cleared');
    },

    clearUserMessages: (state) => {
      state.userMessages = [];
      state.pagination.userMessages = null;
      console.log('🧹 [Admin] User messages cleared');
    },

    // Error Handling
    clearError: (state) => {
      state.error = null;
      console.log('🧹 [Admin] Error cleared');
    },

    // Reset entire state
    resetAdminState: () => {
      console.log('🔄 [Admin] Admin state reset');
      return initialAdminState;
    },
  },
  extraReducers: (builder) => {
    // ========================================================================
    // DASHBOARD ANALYTICS
    // ========================================================================
    builder
      .addCase(fetchDashboardOverview.pending, (state) => {
        state.loading.fetchDashboardOverview = true;
        state.error = null;
      })
      .addCase(fetchDashboardOverview.fulfilled, (state, action) => {
        state.loading.fetchDashboardOverview = false;
        state.dashboardOverview = action.payload.data;
        state.error = null;
      })
      .addCase(fetchDashboardOverview.rejected, (state, action) => {
        state.loading.fetchDashboardOverview = false;
        state.error = action.payload as string;
      })

      .addCase(fetchWeeklyStatistics.pending, (state) => {
        state.loading.fetchWeeklyStatistics = true;
        state.error = null;
      })
      .addCase(fetchWeeklyStatistics.fulfilled, (state, action) => {
        state.loading.fetchWeeklyStatistics = false;
        state.weeklyStatistics = action.payload.data;
        state.error = null;
      })
      .addCase(fetchWeeklyStatistics.rejected, (state, action) => {
        state.loading.fetchWeeklyStatistics = false;
        state.error = action.payload as string;
      })

      .addCase(fetchEngagementStatistics.pending, (state) => {
        state.loading.fetchEngagementStatistics = true;
        state.error = null;
      })
      .addCase(fetchEngagementStatistics.fulfilled, (state, action) => {
        state.loading.fetchEngagementStatistics = false;
        state.engagementStatistics = action.payload.data;
        state.error = null;
      })
      .addCase(fetchEngagementStatistics.rejected, (state, action) => {
        state.loading.fetchEngagementStatistics = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // USER MANAGEMENT
    // ========================================================================
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading.fetchAllUsers = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading.fetchAllUsers = false;
        state.allUsers = action.payload.data.data;
        state.pagination.allUsers = {
          current_page: action.payload.data.current_page,
          last_page: action.payload.data.last_page,
          per_page: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.loading.fetchAllUsers = false;
        state.error = action.payload as string;
      })

      .addCase(updateUser.pending, (state) => {
        state.loading.updateUser = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading.updateUser = false;
        // Update user in the allUsers array
        const userIndex = state.allUsers.findIndex(user => user.id === action.payload.data.user.id);
        if (userIndex !== -1) {
          state.allUsers[userIndex] = action.payload.data.user;
        }
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading.updateUser = false;
        state.error = action.payload as string;
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading.deleteUser = true;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.loading.deleteUser = false;
        // Remove user from allUsers array
        state.allUsers = state.allUsers.filter(user => user.id !== action.payload.userId);
        state.error = null;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading.deleteUser = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // PENDING POSTS
    // ========================================================================
    builder
      .addCase(fetchPendingPosts.pending, (state) => {
        state.loading.fetchPendingPosts = true;
        state.error = null;
      })
      .addCase(fetchPendingPosts.fulfilled, (state, action) => {
        state.loading.fetchPendingPosts = false;
        state.pendingPosts = action.payload.data.data;
        state.pagination.pendingPosts = {
          current_page: action.payload.data.current_page,
          last_page: action.payload.data.last_page,
          per_page: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
        state.error = null;
      })
      .addCase(fetchPendingPosts.rejected, (state, action) => {
        state.loading.fetchPendingPosts = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // APPROVED POSTS
    // ========================================================================
      .addCase(fetchApprovedPosts.pending, (state) => {
        state.loading.fetchApprovedPosts = true;
        state.error = null;
      })
      .addCase(fetchApprovedPosts.fulfilled, (state, action) => {
        state.loading.fetchApprovedPosts = false;
        state.approvedPosts = action.payload.data.data;
        state.pagination.approvedPosts = {
          current_page: action.payload.data.current_page,
          last_page: action.payload.data.last_page,
          per_page: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
        state.error = null;
      })
      .addCase(fetchApprovedPosts.rejected, (state, action) => {
        state.loading.fetchApprovedPosts = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // REJECTED POSTS
    // ========================================================================
      .addCase(fetchRejectedPosts.pending, (state) => {
        state.loading.fetchRejectedPosts = true;
        state.error = null;
      })
      .addCase(fetchRejectedPosts.fulfilled, (state, action) => {
        state.loading.fetchRejectedPosts = false;
        state.rejectedPosts = action.payload.data.data;
        state.pagination.rejectedPosts = {
          current_page: action.payload.data.current_page,
          last_page: action.payload.data.last_page,
          per_page: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
        state.error = null;
      })
      .addCase(fetchRejectedPosts.rejected, (state, action) => {
        state.loading.fetchRejectedPosts = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // ALL POSTS
    // ========================================================================
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading.fetchAllPosts = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading.fetchAllPosts = false;
        state.allPosts = action.payload.data.data;
        state.pagination.allPosts = {
          current_page: action.payload.data.current_page,
          last_page: action.payload.data.last_page,
          per_page: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
        state.error = null;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading.fetchAllPosts = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // APPROVE POST
    // ========================================================================
      .addCase(approvePost.pending, (state) => {
        state.loading.approvePost = true;
        state.error = null;
      })
      .addCase(approvePost.fulfilled, (state, action) => {
        state.loading.approvePost = false;
        // Remove from pending posts
        state.pendingPosts = state.pendingPosts.filter(
          post => post.id !== action.payload.data.post.id
        );
        // Add to approved posts if not already there
        const existingIndex = state.approvedPosts.findIndex(
          post => post.id === action.payload.data.post.id
        );
        if (existingIndex === -1) {
          state.approvedPosts.unshift(action.payload.data.post);
        }
        state.error = null;
      })
      .addCase(approvePost.rejected, (state, action) => {
        state.loading.approvePost = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // REJECT POST
    // ========================================================================
      .addCase(rejectPost.pending, (state) => {
        state.loading.rejectPost = true;
        state.error = null;
      })
      .addCase(rejectPost.fulfilled, (state, action) => {
        state.loading.rejectPost = false;
        // Remove from pending posts
        state.pendingPosts = state.pendingPosts.filter(
          post => post.id !== action.payload.data.post.id
        );
        // Add to rejected posts if not already there
        const existingIndex = state.rejectedPosts.findIndex(
          post => post.id === action.payload.data.post.id
        );
        if (existingIndex === -1) {
          state.rejectedPosts.unshift(action.payload.data.post);
        }
        state.error = null;
      })
      .addCase(rejectPost.rejected, (state, action) => {
        state.loading.rejectPost = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // DELETE POST
    // ========================================================================
      .addCase(deletePost.pending, (state) => {
        state.loading.deletePost = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading.deletePost = false;
        // Remove from all post arrays
        const postId = action.payload.postId;
        state.pendingPosts = state.pendingPosts.filter(post => post.id !== postId);
        state.approvedPosts = state.approvedPosts.filter(post => post.id !== postId);
        state.rejectedPosts = state.rejectedPosts.filter(post => post.id !== postId);
        state.allPosts = state.allPosts.filter(post => post.id !== postId);
        state.error = null;
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading.deletePost = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // PENDING COMMENTS
    // ========================================================================
      .addCase(fetchPendingComments.pending, (state) => {
        state.loading.fetchPendingComments = true;
        state.error = null;
      })
      .addCase(fetchPendingComments.fulfilled, (state, action) => {
        state.loading.fetchPendingComments = false;
        state.pendingComments = action.payload.data.data;
        state.pagination.pendingComments = {
          current_page: action.payload.data.current_page,
          last_page: action.payload.data.last_page,
          per_page: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
        state.error = null;
      })
      .addCase(fetchPendingComments.rejected, (state, action) => {
        state.loading.fetchPendingComments = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // APPROVE COMMENT
    // ========================================================================
      .addCase(approveComment.pending, (state) => {
        state.loading.approveComment = true;
        state.error = null;
      })
      .addCase(approveComment.fulfilled, (state, action) => {
        state.loading.approveComment = false;
        // Remove from pending comments
        state.pendingComments = state.pendingComments.filter(
          comment => comment.id !== action.payload.data.comment.id
        );
        state.error = null;
      })
      .addCase(approveComment.rejected, (state, action) => {
        state.loading.approveComment = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // REJECT COMMENT
    // ========================================================================
      .addCase(rejectComment.pending, (state) => {
        state.loading.rejectComment = true;
        state.error = null;
      })
      .addCase(rejectComment.fulfilled, (state, action) => {
        state.loading.rejectComment = false;
        // Remove from pending comments
        state.pendingComments = state.pendingComments.filter(
          comment => comment.id !== action.payload.data.comment.id
        );
        state.error = null;
      })
      .addCase(rejectComment.rejected, (state, action) => {
        state.loading.rejectComment = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // USER MESSAGES
    // ========================================================================
      .addCase(fetchAdminUserMessages.pending, (state) => {
        state.loading.fetchAllMessages = true;
        state.error = null;
      })
      .addCase(fetchAdminUserMessages.fulfilled, (state, action) => {
        state.loading.fetchAllMessages = false;
        state.userMessages = action.payload.data;
        state.pagination.userMessages = {
          current_page: action.payload.meta.pagination.current_page,
          last_page: action.payload.meta.pagination.last_page,
          per_page: action.payload.meta.pagination.per_page,
          total: action.payload.meta.pagination.total,
          from: action.payload.meta.pagination.from,
          to: action.payload.meta.pagination.to,
        };
        state.error = null;
      })
      .addCase(fetchAdminUserMessages.rejected, (state, action) => {
        state.loading.fetchAllMessages = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // REPLY TO MESSAGE
    // ========================================================================
      .addCase(replyToUserMessage.pending, (state) => {
        state.loading.replyToMessage = true;
        state.error = null;
      })
      .addCase(replyToUserMessage.fulfilled, (state, action) => {
        state.loading.replyToMessage = false;
        // Update message in the list
        const messageIndex = state.userMessages.findIndex(
          message => message.id === action.payload.data.message.id
        );
        if (messageIndex !== -1) {
          state.userMessages[messageIndex] = action.payload.data.message;
        }
        state.error = null;
      })
      .addCase(replyToUserMessage.rejected, (state, action) => {
        state.loading.replyToMessage = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // UPDATE MESSAGE STATUS
    // ========================================================================
      .addCase(updateMessageStatus.pending, (state) => {
        state.loading.updateMessageStatus = true;
        state.error = null;
      })
      .addCase(updateMessageStatus.fulfilled, (state, action) => {
        state.loading.updateMessageStatus = false;
        // Update message status in the list - merge partial data with existing message
        const messageIndex = state.userMessages.findIndex(
          message => message.id === action.payload.data.id
        );
        if (messageIndex !== -1) {
          state.userMessages[messageIndex] = {
            ...state.userMessages[messageIndex],
            status: action.payload.data.status,
            status_display: action.payload.data.status_display,
            updated_at: action.payload.data.updated_at,
          };
        }
        state.error = null;
      })
      .addCase(updateMessageStatus.rejected, (state, action) => {
        state.loading.updateMessageStatus = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // UPDATE PASSWORD
    // ========================================================================
      .addCase(updateAdminPassword.pending, (state) => {
        state.loading.updatePassword = true;
        state.error = null;
      })
      .addCase(updateAdminPassword.fulfilled, (state) => {
        state.loading.updatePassword = false;
        state.error = null;
      })
      .addCase(updateAdminPassword.rejected, (state, action) => {
        state.loading.updatePassword = false;
        state.error = action.payload as string;
      })

    // ========================================================================
    // FAQ MANAGEMENT
    // ========================================================================
      .addCase(fetchAllFaqs.pending, (state) => {
        state.loading.fetchAllFaqs = true;
        state.error = null;
      })
      .addCase(fetchAllFaqs.fulfilled, (state, action) => {
        state.loading.fetchAllFaqs = false;
        state.faqs = action.payload.data.data;
        state.faqPagination = {
          current_page: action.payload.data.current_page,
          last_page: action.payload.data.last_page,
          per_page: action.payload.data.per_page,
          total: action.payload.data.total,
          from: action.payload.data.from,
          to: action.payload.data.to,
        };
        if (action.payload.meta?.stats) {
          state.faqStatistics = action.payload.meta.stats;
        }
        state.error = null;
      })
      .addCase(fetchAllFaqs.rejected, (state, action) => {
        state.loading.fetchAllFaqs = false;
        state.error = action.payload as string;
      })

      .addCase(createFaq.pending, (state) => {
        state.loading.createFaq = true;
        state.error = null;
      })
      .addCase(createFaq.fulfilled, (state, action) => {
        state.loading.createFaq = false;
        // Add the new FAQ to the beginning of the list
        state.faqs.unshift(action.payload.data);
        // Update pagination total if available
        if (state.faqPagination) {
          state.faqPagination.total += 1;
        }
        state.error = null;
      })
      .addCase(createFaq.rejected, (state, action) => {
        state.loading.createFaq = false;
        state.error = action.payload as string;
      })

      .addCase(updateFaq.pending, (state) => {
        state.loading.updateFaq = true;
        state.error = null;
      })
      .addCase(updateFaq.fulfilled, (state, action) => {
        state.loading.updateFaq = false;
        // Update the FAQ in the list
        const faqIndex = state.faqs.findIndex(faq => faq.id === action.payload.data.id);
        if (faqIndex !== -1) {
          state.faqs[faqIndex] = action.payload.data;
        }
        state.error = null;
      })
      .addCase(updateFaq.rejected, (state, action) => {
        state.loading.updateFaq = false;
        state.error = action.payload as string;
      })

      .addCase(deleteFaq.pending, (state) => {
        state.loading.deleteFaq = true;
        state.error = null;
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.loading.deleteFaq = false;
        // Remove the FAQ from the list
        state.faqs = state.faqs.filter(faq => faq.id !== action.payload.faqId);
        // Update pagination total if available
        if (state.faqPagination) {
          state.faqPagination.total -= 1;
        }
        state.error = null;
      })
      .addCase(deleteFaq.rejected, (state, action) => {
        state.loading.deleteFaq = false;
        state.error = action.payload as string;
      })

      .addCase(fetchFaqStatistics.pending, (state) => {
        state.loading.fetchFaqStatistics = true;
        state.error = null;
      })
      .addCase(fetchFaqStatistics.fulfilled, (state, action) => {
        state.loading.fetchFaqStatistics = false;
        state.faqStatistics = action.payload.data;
        state.error = null;
      })
      .addCase(fetchFaqStatistics.rejected, (state, action) => {
        state.loading.fetchFaqStatistics = false;
        state.error = action.payload as string;
      });
  },
});

// Export actions
export const {
  setPostFilters,
  setCommentFilters,
  setMessageFilters,
  setUserFilters,
  clearPendingPosts,
  clearApprovedPosts,
  clearRejectedPosts,
  clearPendingComments,
  clearUserMessages,
  clearError,
  resetAdminState,
} = adminSlice.actions;

// Export reducer
export default adminSlice.reducer; 