import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getReviews } from '../../api/reviewService';
import { getCookie } from '../../store/cookie';
import EmptyPage from '../EmptyPage';

import ReviewCard from './ReviewCard';

export type ReviewType = {
  id: string;
  customerName: string;
  score: number;
  text: string;
  imageUri: string;
  createdAt: string;
};

type ReviewListProps = {
  productId?: string;
  customerId?: number;
};

export default function ReviewList({ productId, customerId }: ReviewListProps) {
  const { data: reviews } = useQuery(
    ['reviews', productId, customerId],
    () => getReviews(productId, customerId),
    { staleTime: 1000 * 60 * 5 }
  );

  const reviewListFunc = () => {
    if (reviews) {
      return (
        <>
          {reviews.length !== 0 ? (
            <ul className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3'>
              {reviews.map((review) => (
                <ReviewCard
                  key={review.id}
                  review={review}
                  customerId={customerId}
                />
              ))}
            </ul>
          ) : (
            <EmptyPage text='리뷰가 없습니다.' />
          )}
        </>
      );
    }
  };

  return (
    <div className='max-w-screen-2xl m-auto px-5'>
      <div className='relative mb-5'>
        <h2 className='text-3xl font-semibold text-center'>리뷰</h2>
      </div>
      {reviewListFunc()}
    </div>
  );
}
