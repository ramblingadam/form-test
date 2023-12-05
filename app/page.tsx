'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../main.css'

const states = {
  1: 'Alabama',
  2: 'Alaska',
  3: 'Arizona',
  4: 'Arkansas',
  5: 'California',
  6: 'Colorado',
  7: 'Connecticut',
  8: 'Delaware',
  9: 'Florida',
  10: 'Georgia',
  11: 'Hawaii',
  12: 'Idaho',
  13: 'Illinois',
  14: 'Indiana',
  15: 'Iowa',
  16: 'Kansas',
  17: 'Kentucky',
  18: 'Louisiana',
  19: 'Maine',
  20: 'Maryland',
  21: 'Massachusetts',
  22: 'Michigan',
  23: 'Minnesota',
  24: 'Mississippi',
  25: 'Missouri',
  26: 'Montana',
  27: 'Nebraska',
  28: 'Nevada',
  29: 'New Hampshire',
  30: 'New Jersey',
  31: 'New Mexico',
  32: 'New York',
  33: 'North Carolina',
  34: 'North Dakota',
  35: 'Ohio',
  36: 'Oklahoma',
  37: 'Oregon',
  38: 'Pennsylvania',
  39: 'Rhode Island',
  40: 'South Carolina',
  41: 'South Dakota',
  42: 'Tennessee',
  43: 'Texas',
  44: 'Utah',
  45: 'Vermont',
  46: 'Virginia',
  47: 'Washington',
  48: 'West Virginia',
  49: 'Wisconsin',
  50: 'Wyoming',
}

/*
[
  {id: id
  name: statename}
]

*/

const toArray = (obj: Record<string, string>) => {
  const arr = []

  for (let stateId in obj) {
    arr.push({ id: stateId, name: obj[stateId] })
  }

  return arr
}

export default function Home() {
  const [statesList, setStatesList] = useState(toArray(states))

  const [seekingLicensure, setSeekingLicensure] = useState(false)

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [stateId, setStateId] = useState('1')
  const [licensureStateId, setLicensureStateId] = useState('1')

  type signupStatusType =
    | 'pending'
    | 'successful'
    | 'duplicateEmail'
    | 'malformedResponse'

  const [signupStatus, setSignupStatus] = useState<signupStatusType>('pending')

  useEffect(() => {
    console.log(statesList)
  }, [statesList])

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value)
    setSignupStatus('pending')
  }
  const handleFirstNameChange = (e: any) => {
    setFirstName(e.target.value)
  }
  const handleLastNameChange = (e: any) => {
    setLastName(e.target.value)
  }
  const handleStateIdChange = (e: any) => {
    setStateId(e.target.value)
  }
  const handleLicensureStateIdChange = (e: any) => {
    setLicensureStateId(e.target.value)
  }

  const handleLicensureCheckboxChange = (e: any) => {
    setSeekingLicensure(!seekingLicensure)
  }

  const handleFormSubmit = async (e: any) => {
    try {
      e.preventDefault()
      const body: any = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        stateId: +stateId,
      }
      if (seekingLicensure) body.licensureStateId = +licensureStateId
      console.log(body)
      const res = await axios.post(
        'http://devinterview.motivohealth.com/submit',
        body
      )

      setSignupStatus('successful')
    } catch (error: any) {
      console.log(error)
      switch (error.response.status) {
        case 409:
          setSignupStatus('duplicateEmail')
          break
        case 400:
          setSignupStatus('malformedResponse')
          break
      }
    }
  }

  return (
    <main>
      <section className='form-wrapper'>
        {signupStatus === 'successful' ? (
          <h1 className='victory'>Signup Successful!</h1>
        ) : (
          <form
            className='form'
            onSubmit={handleFormSubmit}
          >
            <h1>Sign Up</h1>

            <div className='row'>
              <label>
                <p>Email Address</p>
                <input
                  type='email'
                  value={email}
                  onChange={handleEmailChange}
                  required={true}
                ></input>
                {email.length === 0 && (
                  <p className='warning'>Please enter your email address.</p>
                )}
                {signupStatus === 'duplicateEmail' && (
                  <p className='warning'>That email is already in use.</p>
                )}
              </label>
            </div>

            <div className='row-name'>
              <label>
                <p>First Name</p>
                <input
                  type='text'
                  value={firstName}
                  onChange={handleFirstNameChange}
                  required={true}
                ></input>
                {firstName.length === 0 && (
                  <p className='warning'>Please enter your first name.</p>
                )}
              </label>
              <label>
                <p>Last Name</p>
                <input
                  type='text'
                  value={lastName}
                  onChange={handleLastNameChange}
                  required={true}
                ></input>
                {lastName.length === 0 && (
                  <p className='warning'>Please enter your last name.</p>
                )}
              </label>
            </div>

            <div className='row'>
              <label>
                <p>State</p>
                <select
                  value={stateId}
                  onChange={handleStateIdChange}
                  required={true}
                >
                  {statesList.map((state) => (
                    <option value={state.id}>{state.name}</option>
                  ))}
                </select>
                {stateId.length === 0 && (
                  <p className='warning'>Please select a state.</p>
                )}
              </label>
            </div>
            <div className='row'>
              <label className='seekingLicensureBox'>
                <input
                  type='checkbox'
                  checked={seekingLicensure}
                  onChange={handleLicensureCheckboxChange}
                ></input>
                <div className='custom-box'></div>
                <p>I'm seeking licensure in a different state</p>
              </label>
            </div>

            {seekingLicensure && (
              <div className='row'>
                <label>
                  <p>Licensure State</p>
                  <select
                    value={licensureStateId}
                    onChange={handleLicensureStateIdChange}
                    required={seekingLicensure}
                  >
                    {statesList.map((state) => (
                      <option value={state.id}>{state.name}</option>
                    ))}
                  </select>
                  {licensureStateId.length === 0 && (
                    <p className='warning'>Please select a state.</p>
                  )}
                </label>
              </div>
            )}

            <footer>
              <button>Save</button>
            </footer>
          </form>
        )}
      </section>
    </main>
  )
}
