import { render } from "@testing-library/react";
import React, { Component } from "react";



export function MyText(props){
      return  (
        <h1> {props.message} </h1>
    )
}