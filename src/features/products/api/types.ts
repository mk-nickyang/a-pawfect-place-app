export type ProductReviewPicture = {
  urls: { original: string; compact: string };
};

export type ProductReview = {
  id: string;
  title?: string;
  body: string;
  rating: number;
  productId: number;
  reviewerName?: string;
  created_at: string;
  updated_at: string;
  pictures?: ProductReviewPicture[];
};

export type ProductReviewsByProductId = Record<string, ProductReview[]>;
