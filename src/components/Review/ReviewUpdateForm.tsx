import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getReviewDetail, updateReview } from '../../api/reviewService';

type ReviewUpdateFormProps = {
  reviewId: string;
};

export default function ReviewUpdateForm({ reviewId }: ReviewUpdateFormProps) {
  const navigate = useNavigate();
  // const { data: reviewDetail } = useQuery(['reviewDetail', reviewId], () =>
  //   getReviewDetail(reviewId)
  // );
  const reviewDetail = {
    score: 1,
    text: '텐트',
  };
  const { score, text } = reviewDetail;
  const [image, setImage] = useState<File>();
  const [updatedreview, setUpdateReview] = useState({ score, text });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const { files } = e.target as HTMLInputElement;
    if (name === 'image') {
      setImage((files as FileList)[0]);
      return;
    }
    setUpdateReview((review) => ({ ...review, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    updateReview(reviewId, updatedreview, image) //
      .then(() => navigate(-1));
  };

  return (
    <form className='flex flex-col gap-3 items-center' onSubmit={handleSubmit}>
      <input
        type='file'
        name='image'
        className='file-input w-full max-w-xs bg-white'
        accept='image/*'
        onChange={handleChange}
      />
      <label className='input-group w-full max-w-xs'>
        <span className='w-20 justify-center'>평점</span>
        <input
          type='number'
          name='score'
          value={updatedreview.score ?? ''}
          min='0'
          max='5'
          step={0.5}
          placeholder='0 ~ 5'
          className='input bg-white w-full'
          required
          onChange={handleChange}
        />
      </label>
      <textarea
        name='text'
        value={updatedreview.text ?? ''}
        className='textarea w-full max-w-xs bg-white text-base'
        placeholder='내용'
        required
        onChange={handleChange}
      ></textarea>
      <button type='submit' className='btn btn-wide btn-primary mt-3'>
        수정하기
      </button>
    </form>
  );
}