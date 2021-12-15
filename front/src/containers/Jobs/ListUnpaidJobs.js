const ListUnpaidJobs = ({
  data,
}) => {
  return (
    <div className='containerContract'>
        { data.map((summary) => {
        return (
          <div key={summary.id}>
            <p>Id: {summary.id}</p>
            <p>ContractId: {summary.ContractId}</p>
            <p>Client: {summary.ClientId}</p>
            <p>Price: {summary.price ? formatter.format(summary.price) : '-'}</p>
            <p>Payment date: {summary.paymentDate ? new Date(summary.paymentDate) : '-'}</p>
            <p>Paid: {summary.paid ? 'Paid' : 'No'}</p>
            <p>Description: {summary.description}</p>
          </div>
          )
      })
      }
    </div>
  )

}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default ListUnpaidJobs
