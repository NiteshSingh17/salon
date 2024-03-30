import { ScreenContainer, ScreenHeader } from '@salon/ui';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { DAYS_ARRAY, URIS } from '../../constants';
import { useAuthContext } from '../../providers';
import { useUpdateShop } from '../../services';
import { Availability } from '../setup/availability';

export const TimingSetting = () => {
  const { shopData } = useAuthContext();
  const queryClient = useQueryClient();

  const { isPending, mutate } = useUpdateShop({
    onSuccess: async (data) => {
      queryClient.setQueryData([URIS.myShops], (prev) => {
        return prev.map((shop) => (shop.id === data.id ? data : shop));
      });
    },
  });
  const timingData = useMemo(() => {
    return shopData.timings.map((timing) => ({
      name: DAYS_ARRAY[timing.day],
      isCheck: true,
      open: dayjs(timing.open).format('hh:mm a'),
      close: dayjs(timing.close).format('hh:mm a'),
      breakEnable: timing.breakStart ? true : false,
      breakStart: timing.breakStart
        ? dayjs(timing.breakStart).format('hh:mm a')
        : '01:00 pm',
      breakEnd: timing.breakEnd
        ? dayjs(timing.breakEnd).format('hh:mm a')
        : '02:00 pm',
    }));
  }, [shopData]);

  const handleSubmit = (timings) => {
    const formData = new FormData();
    const availability =
      Array.isArray(timings.avaialbility) === true &&
      timings.avaialbility?.length > 0
        ? timings.avaialbility.map((time) => ({
            ...time,
            open: dayjs(time.open).toDate(),
            close: dayjs(time.close).toDate(),
            breakStart: time.breakStart
              ? dayjs(time.breakStart).toDate()
              : null,
            breakEnd: time.breakEnd ? dayjs(time.breakEnd).toDate() : null,
          }))
        : undefined;
    availability?.forEach((timing) =>
      formData.append('timings', JSON.stringify(timing))
    );
    formData.append('id', shopData._id);
    mutate(formData);
  };

  console.log('timingData', timingData);
  return (
    <ScreenContainer>
      <ScreenHeader title="Timing" />
      <Availability
        isLoading={isPending}
        next={handleSubmit}
        data={timingData}
      />
    </ScreenContainer>
  );
};
