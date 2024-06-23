import dayjs from 'dayjs';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { View, Text, Pressable } from 'react-native';


interface DatePickerComponentProps {
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  datePicked: boolean;
  setDatePicked: React.Dispatch<React.SetStateAction<boolean>>;
  datePickerOpen: boolean;
  setDatePickerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  openDatePicker: () => void;
}

const DatePickerComponent: React.FC<DatePickerComponentProps> = ({
  date,
  setDate,
  datePicked,
  setDatePicked,
  datePickerOpen,
  setDatePickerOpen,
  openDatePicker,
}) => {
  const today = new Date;
  const tomorrow = new Date;
  tomorrow.setDate(tomorrow.getDate() + 1);

  return (
    <View>
      {datePicked ? (
        <Pressable
          className="mt-4 flex-row items-center justify-between rounded-xl border-2 border-main px-4 py-3"
          onPress={openDatePicker}
        >
          <View>
            <Text className="font-medium text-base text-emphasized">
              {dayjs(date).format('YYYY년 MM월 DD일')}
            </Text>
            <Text className="mt-1 font-semibold text-base text-main">
              {dayjs(date)
                .format('A HH시 mm분')
                .replace('AM', '오전')
                .replace('PM', '오후')}
            </Text>
          </View>

          <Pressable
            className="rounded-[37px] bg-main px-4 py-[6px]"
            onPress={openDatePicker}
          >
            <Text className="text-white">수정</Text>
          </Pressable>
        </Pressable>
      ) : (
        <Pressable
          className="mt-4 rounded-xl border-2 border-disabled px-4 py-3"
          onPress={openDatePicker}
        >
          <Text className="font-medium text-base text-emphasized">
            {dayjs().format('YYYY년 MM월 DD일')}
          </Text>
          <Text className="mt-1 text-base text-gray300">
            출발시간을 설정해주세요
          </Text>
        </Pressable>
      )}

      <DatePicker
        modal
        open={datePickerOpen}
        date={date}
        minimumDate={today}
        maximumDate={tomorrow}
        mode="datetime"
        onConfirm={(date) => {
          setDatePickerOpen(false);
          setDate(date);
          setDatePicked(true);
        }}
        onCancel={() => {
          setDatePickerOpen(false);
        }}
      />
    </View>
  );
};

export default DatePickerComponent;
