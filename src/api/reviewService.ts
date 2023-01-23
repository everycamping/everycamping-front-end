import axios from 'axios';
import { NewReviewType } from '../components/Review/ReviewForm';
import { ReviewType } from '../components/Review/ReviewList';
import { authAxios } from './authAxios';

export async function getReviews(
  productId?: string,
  customerId?: string
): Promise<ReviewType[]> {
  const res = await axios.get(
    `/api/reviews/${
      customerId ? `customers/${customerId}` : `products/${productId}`
    }`
  );
  return res.data;
}

export async function addNewReview(review: NewReviewType, image: File) {
  const formData = new FormData();
  const blob = new Blob([JSON.stringify(review)], {
    type: 'application/json',
  });
  formData.append('form', blob);
  formData.append('image', image);
  return authAxios.post('/api/reviews', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}
