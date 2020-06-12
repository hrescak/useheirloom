import React, { useState } from 'react'
import Layout from '../../../components/layout/Layout'
import {WithUser} from '../../../components/hoc/withUser'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { RecipeProps } from '../../../types'
import IngredientList from '../../../components/IngredientList'
import SectionHeader from '../../../components/system/SectionHeader'
import { Input, Textarea, Label } from '../../../components/system/Form'
import { InlineButton, PrimaryButton, AccentButton } from '../../../components/system/Button'
import { Plus, ChevronLeft, Trash2, CheckCircle } from 'react-feather'
import { useFetcher } from '../../../lib/hooks'
import Link from 'next/link'
import styled from 'styled-components'

const FullRow = styled.div`
  display: flex;
  flex-direction:row;
  @media(max-width: ${p=>p.theme.breakpoints.medium}) {
        flex-direction:column;
    }
`
const Half = styled.div`
  width:50%;
  @media(max-width: ${p=>p.theme.breakpoints.medium}) {
        width:100%;
        padding:0 !important;
    }
`

const EditRecipe : React.FC = () => {
  const router = useRouter()
  const [showSummary, setShowSummary] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const {id} = router.query
  const {data,error, mutate}:{data?:RecipeProps,error?:any,mutate?:any} = useFetcher(`/api/recipes/${id}`)
  const { register, handleSubmit, errors } = useForm();
  async function onSubmit(data){
    mutate(data,false)
    mutate(await fetch(`/api/recipes/${id}`, {
      method: 'POST',
      body: JSON.stringify(data)
    })).then(p=>router.push(`/recipes/${id}`))
  }
  async function handleDelete(){
    if(confirm('Are you sure you want to delete this recipe?')){
      mutate(await fetch(`/api/recipes/${id}`, {
        method: 'DELETE',
        body: JSON.stringify(data)
      })).then(p=>router.push(`/`))
    }
  }
  return (
    <Layout invertHeader title='Edit Recipe' leftControl= {
      <Link href={`/recipes/[id]`} as={`/recipes/${id}`}>
          <PrimaryButton icon={<ChevronLeft/>}>Back</PrimaryButton>
      </Link> 
    } rightControl={
      <>
        <PrimaryButton icon={<Trash2/>} style={{marginRight:'0.5rem'}} onClick = {()=>handleDelete()}>Delete</PrimaryButton>
        <AccentButton icon={<CheckCircle/>} onClick = {handleSubmit(onSubmit)}>Save</AccentButton>
      </>
    }>
        <Label>Recipe Title</Label>
        <Input type="text" placeholder="Something super tasty" name="name" defaultValue={data?.name} ref={register} />
        { ((!showSummary && !data?.summary) || (!showSource && !data?.sourceName)) && (
          <div>
             {!showSummary && !data?.summary && (
              <InlineButton onClick={()=>setShowSummary(true)} icon={<Plus/>}>Add a Summary</InlineButton>
            )}
            {!showSource && !data?.sourceName && (
              <InlineButton onClick={()=>setShowSource(true)} icon={<Plus/>}>Add Source</InlineButton>
            )}
          </div>
        )}
        { (showSummary || data?.summary ) && (
          <>
            <Label>Recipe Summary or Description</Label>
            <Textarea name="summary" defaultValue={data?.summary} ref={register} rows={3} />
          </>
        )}
        { (showSource || data?.sourceName ) && (
          <FullRow>
            <Half style={{paddingRight:'1rem'}}>
              <Label>Source Title</Label>
              <Input type="text" placeholder="Food blog name, or 'Grandma'" name="sourceName" defaultValue={data?.sourceName} ref={register} />
            </Half>
            <Half style={{paddingLeft:'1rem'}}>
              <Label>Optional Source URL</Label>
              <Input type="url" placeholder="http://" name="sourceURL" defaultValue={data?.sourceURL} ref={register} />
            </Half>
          </FullRow>
        )}
        <SectionHeader>Ingredients</SectionHeader>
        <IngredientList recipeId={Number(id)} editable={true}/>
        <SectionHeader>Instructions</SectionHeader>
        <Textarea name="instructions" defaultValue={data?.instructions} ref={register} rows={20} />
    </Layout>
  )
}


export default WithUser(EditRecipe)
