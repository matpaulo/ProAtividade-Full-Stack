interface Props {
    title: string;
    children?: React.ReactNode
}

export default function TitlePage({title, children} : Props) {
  return (
    <div className="d-flex justify-content-between align-items-end 
        mt-3 pb-3 border-bottom border-1">
        <h3 className='m-0 p-0'>{title}</h3>
        {children}
    </div>
  )
}
