import {Dropdown, Image, Menu, Row} from "antd";
import {FileAddFilled} from "@ant-design/icons";
import React from "react";

export default ({images})=>{
    const imgrightmenu = (
        <Menu
            items={[
                {
                    label: <a>删除</a>,
                    key: '2',
                    style: {width: 80}
                }
            ]}
        />
    )

    return(
        <Row align="middle">
            <Image.PreviewGroup>
                {images.map((itm, index) => {
                    return (
                        <Dropdown key={index} overlay={imgrightmenu} trigger={['contextMenu']}>
                            <Image
                                key={index}
                                height={40}
                                src={itm}
                                onClick={(e) => {
                                    e.stopPropagation();
                                }}
                                onContextMenu={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                }
                                }

                            />
                        </Dropdown>
                    )
                })}

            </Image.PreviewGroup>
            <FileAddFilled style={{color: "#6488b9", fontSize: "24px", cursor: "pointer"}}/>
        </Row>
    )
}