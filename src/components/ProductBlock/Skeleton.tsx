import React from "react"
import ContentLoader from "react-content-loader"

export const Skeleton = (props:any) => (
    <ContentLoader
        speed={2}
        width={260}
        height={420}
        viewBox="0 0 260 420"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="1" y="353" rx="10" ry="10" width="85" height="30" />
        <rect x="117" y="345" rx="25" ry="25" width="128" height="45" />
        <rect x="3" y="35" rx="0" ry="0" width="237" height="201" />
        <rect x="6" y="268" rx="0" ry="0" width="237" height="52" />
    </ContentLoader>
)

