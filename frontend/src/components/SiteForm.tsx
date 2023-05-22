import React, { useState, ChangeEvent, FormEvent } from "react";
import Form from "@/components/FormBase";
import Input from "@/components/Input";

const SiteForm = () => {
    const [data, setData] = useState({})

    const updateData = (event: ChangeEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }
    const submit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        console.log(data)
    }

    return (
        <Form formAction={submit} submitText={"Create site"}>
            <Input inputId={"site-title"} labelText={"Title"} required={true} type={"text"} getData={updateData} />
            <Input inputId={"site-url"} labelText={"Url"} required={true} type={"text"} getData={updateData} />

        </Form>
    )
}

export default SiteForm;