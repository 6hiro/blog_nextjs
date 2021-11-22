export interface POST {
  id: any,
  title: string,
  previewContent: string,
  post: string,
  createdAt: string,
  updatedAt: string,
  category: string,
  categoryName: string,
  tags: [
    {
      id: string, 
      name: string
    }
  ],
}