import './listContracts.styles.scss'


const ListContracts = ({
  data,
}) => {
  return (
    <div className='containerContract'>
     { data.length ? data.map((summary) => {
        return (
          <div key={summary.id}>
            <p>ContractId: {summary.id}</p>
            <p>ContractId: {summary.ContractorId}</p>
            <p>ClientId:{summary.ClientId}</p>
            <p>Status: {summary.status}</p>
            <p>Terms: {summary.terms}</p>
          </div>
          )
      }) :
        <div key={data.id}>
          <p>ContractId: {data.id}</p>
          <p>ContractId: {data.ContractorId}</p>
          <p>ClientId: {data.ClientId}</p>
          <p>Status: {data.status}</p>
          <p>Terms: {data.terms}</p>
        </div>
      }
    </div>
  )

}

export default ListContracts
