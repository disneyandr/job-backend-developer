export class PaginatedResult<T> {
    data: T[];
    totalItems: number;
    totalPages: number;
    currentPage: number;
  
    constructor(data: T[], totalItems: number, totalPages: number, currentPage: number) {
      this.data = data;
      this.totalItems = totalItems;
      this.totalPages = totalPages;
      this.currentPage = currentPage;
    }
  }
  