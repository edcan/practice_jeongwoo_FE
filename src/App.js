import logo from './logo.svg';
import './App.css';
import styled from 'styled-components'
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

import axios from 'axios'

const App = () => {
  const backendUrl = process.env.REACT_APP_BACK_URL;

  const [name, setName] = useState('')
  const [oldName, setOldName] = useState('')
  // 우리가 해야할 일: 원래 name을 기존의 서버에 있던 name으로 해보기

  const log = (data) => {
    setName(data)
    console.log(name)
  }

  const loadData = async (name) => {
    try {
      const response = await axios.post(`${backendUrl}/my-page`, null, { params: { name: name } } );
      if (response.data.code === 200) {
        window.location.reload();
      }
      return response.data
    }
    catch (error) {
      console.error('failed connect server', error)
      alert('실패!')
      throw error
    }
  }

  useEffect(() => {
    const LoadData = async () => {
      try {
        const response = await axios.get(`${backendUrl}/my-page`, { params: { id: 1 } } );
        setOldName(response.data.result)
        Cookies.set('old-data', response.data.result, { expires: 7 })
        return response.data
      }
      catch (error) {
        console.error('failed connect server', error)
        throw error
      }
    }

    const savedData = Cookies.get('old-data');
    setOldName(savedData)

    LoadData() 
  }, [])

  return (
    <div className="App">
      <Align>
        <Name>원래 이름: {oldName}</Name>
        <InputName placeholder='이름을 입력하세요' onChange={(event) => log(event.target.value)} value={name}/>
        <Button onClick={() => loadData(name)}>변경해보기</Button>
      </Align>
    </div>
  );
}

const Name = styled.div`
  width: 400px;
  text-align: left;
  margin-bottom: 20px;
  font-weight: 600;
  font-size: 18px;
`

const Align = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`

const InputName = styled.input.attrs({ type: 'text' })`
  width: 400px;
  height: 50px;
  border: 2px solid gray;
  padding-left: 16px;
  box-sizing: border-box;
  font-size: 18px;
  transition-duration: 0.2s;

  &:focus {
    border: 2px solid #58C569;
    transition-duration: 0.2s;
  }
`

const Button = styled.div`
  width: 400px;
  margin-top: 20px;
  height: 50px;
  background-color: black;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  border-radius: 12px;
  transition-duration: 0.2s;

  &:hover {
    opacity: 0.7;
    transition-duration: 0.2s;
  }
`

export default App;
