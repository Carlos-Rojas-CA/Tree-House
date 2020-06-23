import React, { ReactElement } from 'react'
// import Grid from '@material-ui/core/Grid';

function CircleImage(props: any): ReactElement {

    console.log(props)
    const style = {
        block: {
            width: "100%",
            height: "auto",
            padding: "10%",
            position: "relative",
        },
        circle: {
            position: "absolute",
            left: "50%",
            top: '37%',
            transform: "translate(-50%, -50%)",
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            backgroundColor: "aquamarine",
            margin: "5%",
            padding: "5%"

        },
        h3: {
            color: "black",
            textAlign: "center",
            // marginTop: "5px"
        },

    }


    return (
        <div style={{
            // margin: "5%"
        }}>
            <div style={{
                width: "100%",
                display: "inline-block",
                // height: "auto",
                // margin: "5%",
                position: "relative",
            }}>
                <div style={{
                    marginTop: "100%",
                }} >
                    <div style={{
                        // width: "90%",
                        // height: "100px",
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        borderRadius: "50%",
                        backgroundColor: "aquamarine",
                        // margin: "5%",
                        // padding: "5%"

                    }} />
                </div>
            </div>
            <h3 style={{ textAlign: "center", color: "black", marginTop: "1px" }} > {props.clubName} </h3>
        </div>
    )
}

export default CircleImage;