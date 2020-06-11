import React from 'react'
import styled from 'styled-components'
import Layout from '../../components/layout/SettingsLayout'
import { H1 } from '../../components/system/Typography'
import { Label, Input } from '../../components/system/Form'
import { useFetcher } from '../../lib/hooks'
import { useForm } from 'react-hook-form'
import { WithUser } from '../../components/hoc/withUser'
import { useRouter } from 'next/router'

const InputRow = styled.div`
    display: flex;
    flex-direction: row;
`
const RowDetail = styled.div`
    width:50%;
    padding:0.75rem 0 0 1rem;
    font-size:0.875rem;
    color:${p=>p.theme.colors.textSecondary};
`
const Half = styled.div`
    width:50%;
`
const SettingsPage: React.FC = (props) =>{
    const {data,error, mutate} = useFetcher('/api/user')
    const router = useRouter()
    const {handleSubmit,register} = useForm()
    async function onSubmit(formData){
        const newUser= {...data.user,...formData}
        console.log(data)
        console.log({user:newUser})
        mutate({user:formData},false)
        mutate(await fetch(`/api/user`, {
            method: 'POST',
            body: JSON.stringify(formData)
        })).then(p=>router.push(`/`))
        
    }
    return (
        <Layout title="User Settings" saveClicked={handleSubmit(onSubmit)}>
            <H1>Account Settings</H1>
            {error && error.message}
            {data && data.user &&
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label>Email</Label>
                <InputRow>
                    <Half>
                        <Input name="email" placeholder="your@email.com" defaultValue={data.user.email} ref={register}/>
                    </Half>
                    <RowDetail>
                        How we get in touch with you, and how you log in to Heirloom.
                    </RowDetail>
                </InputRow>
                <Label>Name</Label>
                <InputRow>
                    <Half>
                        <Input name="name" placeholder="First Last" defaultValue={data.user.name} ref={register}/>
                    </Half>
                    <RowDetail>
                        Your name, to use in all the places where people would call you young lady, or dude.
                    </RowDetail>
                </InputRow>
                <Label>Kitchen name</Label>
                <InputRow>
                    <Half>
                        <Input name="kitchenName" placeholder="Joe's Kitchen" defaultValue={data.user.kitchenName} ref={register}/>
                    </Half>
                    <RowDetail>
                        This will be the title of all the recipes when you share them with your friends (and enemies).
                    </RowDetail>
                </InputRow>
            </form>}
        </Layout>
    )
}

export default WithUser(SettingsPage)