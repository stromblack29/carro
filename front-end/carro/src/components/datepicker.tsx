import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useImperativeHandle } from 'react';

export type ChildrenHandle = {
    getChildState: () => any;
};
type Props = {
    data?: any
};

export default React.forwardRef<ChildrenHandle, Props>(function DatePickerValue(props, ref) {
    const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

    useImperativeHandle(ref, () => ({
        getChildState: () => {
            return {
                date: value
            }
        }
    }));
    
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
            <DatePicker
            label="Date of birth"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            />
        </DemoContainer>
        </LocalizationProvider>
    );
});