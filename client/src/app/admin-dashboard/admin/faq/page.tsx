"use client"

import { useState, useEffect } from "react"
import {
  Search,
  Edit,
  Trash2,
  Plus,
  RefreshCw,
  AlertTriangle,
  BookOpen,
  X,
  Info
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { DialogTrigger } from "@radix-ui/react-dialog"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { DialogFooter } from "@/components/ui/dialog"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { fetchAllFaqs, createFaq, updateFaq, deleteFaq, clearError } from "@/store/slices/adminSlice"
import { FAQ } from "@/store/types/faq"

export default function FAQManagement() {
  const { toast } = useToast()
  const dispatch = useAppDispatch()
  
  // Redux state
  const { faqs, loading, faqPagination, faqStatistics, error } = useAppSelector((state) => ({
    faqs: state.admin.faqs,
    loading: state.admin.loading,
    faqPagination: state.admin.faqPagination,
    faqStatistics: state.admin.faqStatistics,
    error: state.admin.error
  }))

  // Local state
  const [searchTerm, setSearchTerm] = useState("")
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [currentFaq, setCurrentFaq] = useState<FAQ | null>(null)
  const [newQuestion, setNewQuestion] = useState("")
  const [newAnswer, setNewAnswer] = useState("")

  // Fetch FAQs on component mount
  useEffect(() => {
    dispatch(fetchAllFaqs({}))
  }, [dispatch])

  // Filter FAQs based on search term
  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle creating a new FAQ
  const handleCreateFaq = async () => {
    try {
      await dispatch(createFaq({ question: newQuestion, answer: newAnswer })).unwrap()
      setNewQuestion("")
      setNewAnswer("")
      setCreateDialogOpen(false)
      toast({
        title: "FAQ Created",
        description: "The FAQ has been successfully created.",
      })
    } catch (error: unknown) {
      console.error('Create FAQ Error:', error)
      // Check if it's a validation error
      const err = error as { response?: { data?: { errors?: Record<string, string[]> } } }
      if (err?.response?.data?.errors) {
        const validationErrors = err.response.data.errors
        const errorMessages = Object.values(validationErrors).flat().join(', ')
        toast({
          title: "Validation Error",
          description: errorMessages,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: error as string || "Failed to create FAQ",
          variant: "destructive",
        })
      }
    }
  }

  // Handle editing an existing FAQ
  const handleEditFaq = async () => {
    if (!currentFaq) return
    
    try {
      await dispatch(updateFaq({ 
        faqId: currentFaq.id, 
        question: newQuestion, 
        answer: newAnswer 
      })).unwrap()
      setEditDialogOpen(false)
      toast({
        title: "FAQ Updated",
        description: "The FAQ has been successfully updated.",
      })
    } catch (error: unknown) {
      console.error('Update FAQ Error:', error)
      // Check if it's a validation error
      const err = error as { response?: { data?: { errors?: Record<string, string[]> } } }
      if (err?.response?.data?.errors) {
        const validationErrors = err.response.data.errors
        const errorMessages = Object.values(validationErrors).flat().join(', ')
        toast({
          title: "Validation Error",
          description: errorMessages,
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: error as string || "Failed to update FAQ",
          variant: "destructive",
        })
      }
    }
  }

  // Handle deleting a FAQ
  const handleDeleteFaq = async () => {
    if (!currentFaq) return
    
    try {
      await dispatch(deleteFaq(currentFaq.id)).unwrap()
      setDeleteDialogOpen(false)
      toast({
        title: "FAQ Deleted",
        description: "The FAQ has been successfully deleted.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error as string || "Failed to delete FAQ",
        variant: "destructive",
      })
    }
  }

  // Open edit dialog with selected FAQ
  const openEditDialog = (faq: FAQ) => {
    setCurrentFaq(faq)
    setNewQuestion(faq.question)
    setNewAnswer(faq.answer)
    setEditDialogOpen(true)
  }

  // Open delete dialog with selected FAQ
  const openDeleteDialog = (faq: FAQ) => {
    setCurrentFaq(faq)
    setDeleteDialogOpen(true)
  }

  return (
    <div className="min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">FAQ Management</h1>
        <p className="text-gray-600">
          Manage frequently asked questions displayed to users.
        </p>
      </div>

      {/* Statistics Cards */}
      {faqStatistics && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 font-medium">Total FAQs</p>
                  <p className="text-2xl font-bold text-blue-700">{faqStatistics.total_faqs}</p>
                </div>
                <div className="p-2 bg-blue-100 rounded-full">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-green-200 bg-green-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 font-medium">Recent FAQs</p>
                  <p className="text-2xl font-bold text-green-700">{faqStatistics.recent_faqs}</p>
                </div>
                <div className="p-2 bg-green-100 rounded-full">
                  <RefreshCw className="w-5 h-5 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 font-medium">Latest FAQ</p>
                  <p className="text-sm font-semibold text-purple-700 truncate">
                    {faqStatistics.latest_faq.question}
                  </p>
                </div>
                <div className="p-2 bg-purple-100 rounded-full">
                  <Plus className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Error Banner */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-red-800">Error</h4>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dispatch(clearError())}
                className="text-red-600 hover:text-red-800 hover:bg-red-100 p-1 h-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6 overflow-hidden border border-purple-100 shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-500 to-blue-500 text-white py-4">
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Frequently Asked Questions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input 
                placeholder="Search FAQs..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => dispatch(fetchAllFaqs({}))}
                disabled={loading.fetchAllFaqs}
                className="h-10"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${loading.fetchAllFaqs ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add New FAQ
                  </Button>
                </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Create New FAQ</DialogTitle>
                  <DialogDescription>
                    Add a new question and answer to the FAQ section.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Question</label>
                    <Input 
                      placeholder="Enter the question..." 
                      value={newQuestion}
                      onChange={(e) => setNewQuestion(e.target.value)}
                    />
                    <div className="flex justify-between text-xs">
                      <span className={`${newQuestion.trim().length < 10 ? 'text-red-500' : 'text-green-600'}`}>
                        {newQuestion.trim().length}/10 characters
                      </span>
                      <span className="text-gray-500">Minimum 10 characters required</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Answer</label>
                    <Textarea 
                      placeholder="Enter the answer..." 
                      rows={5}
                      value={newAnswer}
                      onChange={(e) => setNewAnswer(e.target.value)}
                    />
                    <div className="flex justify-between text-xs">
                      <span className={`${newAnswer.trim().length < 20 ? 'text-red-500' : 'text-green-600'}`}>
                        {newAnswer.trim().length}/20 characters
                      </span>
                      <span className="text-gray-500">Minimum 20 characters required</span>
                    </div>
                  </div>
                  
                  {/* Validation Helper */}
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex items-start gap-2">
                      <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                      <div className="text-sm">
                        <p className="font-medium text-blue-800">Validation Requirements:</p>
                        <ul className="mt-1 text-blue-700 space-y-1">
                          <li>• Question must be at least 10 characters long</li>
                          <li>• Answer must be at least 20 characters long</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                <DialogFooter className="mt-6">
                  <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button 
                    className="bg-purple-600 hover:bg-purple-700  text-white"
                    onClick={handleCreateFaq}
                    disabled={
                      !newQuestion.trim() || 
                      !newAnswer.trim() || 
                      newQuestion.trim().length < 10 || 
                      newAnswer.trim().length < 20 || 
                      loading.createFaq
                    }
                  >
                    {loading.createFaq ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-4 w-4" />
                        Create FAQ
                      </>
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            </div>
          </div>

          {loading.fetchAllFaqs ? (
            <div className="flex items-center justify-center py-10">
              <RefreshCw className="w-8 h-8 animate-spin text-purple-600" />
            </div>
          ) : filteredFaqs.length === 0 ? (
            <div className="text-center py-10">
              <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No FAQs Found</h3>
              <p className="text-gray-500 mt-2">
                {searchTerm ? "Try a different search term." : "Add your first FAQ using the button above."}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead className="w-[300px]">Question</TableHead>
                    <TableHead>Answer</TableHead>
                    <TableHead className="w-[100px] text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredFaqs.map((faq) => (
                    <TableRow key={faq.id}>
                      <TableCell className="font-medium">{faq.id}</TableCell>
                      <TableCell className="font-medium">{faq.question}</TableCell>
                      <TableCell className="text-sm text-gray-600">
                        {faq.answer.length > 100 
                          ? `${faq.answer.substring(0, 100)}...` 
                          : faq.answer}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openEditDialog(faq)}
                            className="h-8 w-8 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => openDeleteDialog(faq)}
                            className="h-8 w-8 text-red-600 hover:text-red-800 hover:bg-red-100"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          
          {/* Pagination Info */}
          {faqPagination && faqPagination.total > 0 && (
            <div className="mt-4 flex items-center justify-between text-sm text-gray-600 border-t pt-4">
              <div>
                Showing {faqPagination.from} to {faqPagination.to} of {faqPagination.total} FAQs
              </div>
              <div className="flex items-center gap-2">
                <span>Page {faqPagination.current_page} of {faqPagination.last_page}</span>
                {faqPagination.last_page > 1 && (
                  <div className="flex items-center gap-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(fetchAllFaqs({ page: faqPagination.current_page - 1 }))}
                      disabled={faqPagination.current_page === 1 || loading.fetchAllFaqs}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(fetchAllFaqs({ page: faqPagination.current_page + 1 }))}
                      disabled={faqPagination.current_page === faqPagination.last_page || loading.fetchAllFaqs}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
            <DialogDescription>
              Update the question and answer for this FAQ.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Question</label>
              <Input 
                placeholder="Enter the question..." 
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
              <div className="flex justify-between text-xs">
                <span className={`${newQuestion.trim().length < 10 ? 'text-red-500' : 'text-green-600'}`}>
                  {newQuestion.trim().length}/10 characters
                </span>
                <span className="text-gray-500">Minimum 10 characters required</span>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Answer</label>
              <Textarea 
                placeholder="Enter the answer..." 
                rows={5}
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
              />
              <div className="flex justify-between text-xs">
                <span className={`${newAnswer.trim().length < 20 ? 'text-red-500' : 'text-green-600'}`}>
                  {newAnswer.trim().length}/20 characters
                </span>
                <span className="text-gray-500">Minimum 20 characters required</span>
              </div>
            </div>
            
            {/* Validation Helper */}
            <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-blue-800">Validation Requirements:</p>
                  <ul className="mt-1 text-blue-700 space-y-1">
                    <li>• Question must be at least 10 characters long</li>
                    <li>• Answer must be at least 20 characters long</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              className="bg-blue-600 hover:bg-blue-700  text-white"
              onClick={handleEditFaq}
              disabled={
                !newQuestion.trim() || 
                !newAnswer.trim() || 
                newQuestion.trim().length < 10 || 
                newAnswer.trim().length < 20 || 
                loading.updateFaq
              }
            >
              {loading.updateFaq ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                <>
                  <Edit className="mr-2 h-4 w-4" />
                  Update FAQ
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-red-600">Delete FAQ</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this FAQ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="p-4 bg-gray-50 rounded-md mt-4">
            <p className="font-medium">{currentFaq?.question}</p>
          </div>
          <DialogFooter className="mt-6">
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeleteFaq}
              disabled={loading.deleteFaq}
            >
              {loading.deleteFaq ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete FAQ
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}