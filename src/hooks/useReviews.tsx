import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addNewReview, deleteReview, updateReview } from '../api/reviewService';
import { NewReviewType } from '../components/Review/ReviewForm';

export default function useReviews() {
  const queryClient = useQueryClient();

  const addReviewMutation = useMutation(
    ({
      productId,
      review,
      image,
    }: {
      productId: string;
      review: NewReviewType;
      image: File;
    }) => addNewReview(productId, review, image),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reviews']);
      },
    }
  );

  const updateReviewMutation = useMutation(
    ({
      reviewId,
      updatedreview,
      image,
    }: {
      reviewId: string;
      updatedreview: NewReviewType;
      image?: File;
    }) => updateReview(reviewId, updatedreview, image),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reviews']);
      },
    }
  );

  const deleteReviewMutation = useMutation(
    ({ id }: { id: string }) => deleteReview(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reviews']);
      },
    }
  );

  return { addReviewMutation, deleteReviewMutation, updateReviewMutation };
}
