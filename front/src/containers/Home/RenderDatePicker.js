import 'antd/dist/antd.css'
import { DatePicker } from 'antd'

const RenderDatePicker = ({
  startDate,
  endDate,
  endOpen,
  handleEndOpenChange,
  handleStartOpenChange,
  onStartChange,
  disabledStartDate,
  onEndChange,
  disabledEndDate,
}) => {
  return (
    <div>
      <div>
        <DatePicker
          disabledDate={disabledStartDate}
          showTime
          format="YYYY-MM-DD"
          value={startDate}
          placeholder="Start"
          onChange={onStartChange}
          onOpenChange={handleStartOpenChange}
        />
        <DatePicker
          disabledDate={disabledEndDate}
          showTime
          format="YYYY-MM-DD"
          value={endDate}
          placeholder="End"
          onChange={onEndChange}
          open={endOpen}
          onOpenChange={handleEndOpenChange}
        />
        </div>
    </div>
  )

}

export default RenderDatePicker
