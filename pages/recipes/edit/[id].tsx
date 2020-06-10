import React, { useState } from 'react'
import Layout from '../../../components/layout/EditRecipeLayout'
import {WithUser} from '../../../components/hoc/withUser'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import useSWR from 'swr'
import fetch from 'isomorphic-unfetch'
import { RecipeProps } from '../../../types'
import IngredientList from '../../../components/IngredientList'
import SectionHeader from '../../../components/system/SectionHeader'
import { Input, Textarea, Label } from '../../../components/system/Form'
import { InlineButton } from '../../../components/system/Button'
import { Plus } from 'react-feather'

const EditRecipe : React.FC = () => {
  const router = useRouter()
  const [showSummary, setShowSummary] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const {id} = router.query
  const {data,error, mutate}:{data?:RecipeProps,error?:any,mutate?:any} = useSWR(`/api/recipes/${id}`, url => fetch(url).then(r => r.json()))
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
    <Layout recipeId={Number(id)} saveClicked={handleSubmit(onSubmit)} deleteClicked={()=>handleDelete()}>
        <Label>Recipe Title</Label>
        <Input type="text" placeholder="Something super tasty" name="name" defaultValue={data?.name} ref={register} />
        { ((!showSummary && !data?.summary) || (!showSource && !data?.sourceName)) && (
          <div style={{marginLeft:"-12px"}}>
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
          <div style={{display:'flex',flexDirection:'row'}}>
            <div style={{paddingRight:'1rem',width:'50%'}}>
              <Label>Source Title</Label>
              <Input type="text" placeholder="Food blog name, or 'Grandma'" name="sourceName" defaultValue={data?.sourceName} ref={register} />
            </div>
            <div style={{paddingLeft:'1rem',width:'50%'}}>
              <Label>Optional Source URL</Label>
              <Input type="url" placeholder="http://" name="sourceURL" defaultValue={data?.sourceURL} ref={register} />
            </div>
          </div>
        )}
        <SectionHeader>Ingredients</SectionHeader>
        <IngredientList recipeId={Number(id)} editable={true}/>
        <SectionHeader>Instructions</SectionHeader>
        <Textarea name="instructions" defaultValue={data?.instructions} ref={register} rows={20} />
    </Layout>
  )
}


export default WithUser(EditRecipe)
