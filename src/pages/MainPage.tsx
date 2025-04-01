interface IProps {
    currentpath: string
}

export default function MainPage(props: IProps) {
    const {currentpath} = props
    return (
        <div className="w-full h-full">
          <span className='text-[white]'>当前路径{currentpath }</span>

        </div>
    )
}