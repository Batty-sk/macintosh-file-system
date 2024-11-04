import "../index.css"


type Prop ={
  path:string
}
const AddrBar = ({path}:Prop) => {
  return (
    <div className='w-8/12 ml-10'>
      <p className='title text-sm'>{path}</p>
    </div>
  )
}

export default AddrBar
