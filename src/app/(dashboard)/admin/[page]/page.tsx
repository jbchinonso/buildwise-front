import React from 'react'

const Page = async (props: any) => {
  return (
    <div>{(await props?.params)?.page}</div>
  )
}

export default Page