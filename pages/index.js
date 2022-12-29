import Head from 'next/head'
import styles from '../styles/Home.module.css'
import clientPromise from '../lib/mongodb'
import { useState } from 'react'

export default function Home({ ethan, uyen }) {
  const [amount, setAmount] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [percent, setPercent] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
  const [name, setName] = useState("")
  const [date, setDate] = useState("")
  const [transactions, setTransactions] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();

    const person= personSelected(e.target[0][0].selected, e.target[0][1].selected)
    const date = e.target[1].value
    const category = categorySelected(e.target[2][0].selected, e.target[2][1].selected, e.target[2][2].selected, e.target[2][3].selected, e.target[2][4].selected, e.target[2][5].selected, e.target[2][6].selected, e.target[2][7].selected, e.target[2][8].selected, e.target[2][9].selected)
    const description = e.target[3].value
    const amount = e.target[4].value

    const data = {
      person: person,
      date: date,
      category: category,
      description: description,
      amount: amount
    }
    
    const JSONData = JSON.stringify(data)
    const endpoint = '/api/add'
    
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSONData
    }

    fetch(endpoint, options)

    location.reload();
  }

  const getSummary = (e) => {
    e.preventDefault();

    let person = personSelected(e.target[0][0].selected, e.target[0][1].selected)
    const month = monthSelected(e.target[1][0].selected, e.target[1][1].selected, e.target[1][2].selected, e.target[1][3].selected, e.target[1][4].selected, e.target[1][5].selected, e.target[1][6].selected, e.target[1][7].selected, e.target[1][8].selected, e.target[1][9].selected, e.target[1][10].selected, e.target[1][11].selected)
    const year = e.target[2].value
    const items = []

    let totalSum = 0
    let totalSumEatingOut = 0
    let totalSumShopping = 0
    let totalSumTravel = 0
    let totalSumEntertainment = 0
    let totalSumGroceries = 0
    let totalSumCoffee = 0
    let totalSumTransportation = 0
    let totalSumBills = 0
    let totalSumInvestment = 0
    let totalSumMisc = 0

    if (person === 'ethan') {
      person = JSON.parse(ethan)
    } else {
      person = JSON.parse(uyen)
    }

    person.forEach((item) => {
      if (item.date.substring(5, 7) === month && item.date.substring(0, 4) === year) {
        items.push(item)
        const amount = parseFloat(item.amount)
        totalSum += amount
        if (item.category === 'eatingout') {
          totalSumEatingOut += amount
        } else if (item.category === 'shopping') {
          totalSumShopping += amount
        } else if (item.category === 'travel') {
          totalSumTravel += amount
        } else if (item.category === 'entertainment') {
          totalSumEntertainment += amount
        } else if (item.category === 'groceries') {
          totalSumGroceries += amount
        } else if (item.category === 'coffee') {
          totalSumCoffee += amount
        } else if (item.category === 'transportation') {
          totalSumTransportation += amount
        } else if (item.category === 'bills') {
          totalSumBills += amount
        } else if (item.category === 'investment') {
          totalSumInvestment += amount
        } else if (item.category === 'misc') {
          totalSumMisc += amount
        }
      }
    })

    setName(personSelected(e.target[0][0].selected, e.target[0][1].selected))
    setAmount([totalSum.toFixed(2), totalSumEatingOut.toFixed(2), totalSumShopping.toFixed(2), totalSumTravel.toFixed(2), totalSumEntertainment.toFixed(2), totalSumGroceries.toFixed(2), totalSumCoffee.toFixed(2), totalSumTransportation.toFixed(2), totalSumBills.toFixed(2), totalSumInvestment.toFixed(2), totalSumMisc.toFixed(2)])
    setPercent([totalSum, totalSumEatingOut, totalSumShopping, totalSumTravel, totalSumEntertainment, totalSumGroceries, totalSumCoffee, totalSumTransportation, totalSumBills, totalSumInvestment, totalSumMisc].map((item) => {
      return Math.round((item / totalSum) * 100)
    }))
    setDate(month + '/' + year)
    setTransactions(items)
  }

  return (
    <>
      <Head>
        <title>Expense Tracker</title>
        <meta name="description" content="For Ethan and Uyen" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.input}>
          <label htmlFor="person">Who are you?</label>
          <select name="person" id="person" required>
            <option value="ethan">Ethan</option>
            <option value="uyen">Cool Uyen</option>
          </select>
        </div>

        <div className={styles.input}>
          <label htmlFor="date">When did you spend it?</label>
          <input type="date" id="date" name="date" required/>
        </div>

        <div className={styles.input}>
          <label htmlFor="category">What category is this expense?</label>
          <select name="category" id="category" required>
            <option value="eatingout">Eating out</option>
            <option value="shopping">Shopping</option>
            <option value="travel">Travel</option>
            <option value="entertainment">Entertainment</option>
            <option value="groceries">Groceries</option>
            <option value="coffee">Coffee</option>
            <option value="transportation">Transportation</option>
            <option value="bills">Bills</option>
            <option value="investment">Investment</option>
            <option value="misc">Misc</option>
          </select>
        </div>

        <div className={styles.input}>
          <label htmlFor="description">What did you buy?</label>
          <input type="text" id="description" name="description" required/>
        </div>

        <div className={styles.input}>
          <label htmlFor="amount">How much did you spend?</label>
          <input type="number" step="0.01" id="amount" name="amount" required/>
        </div>

        <input type="submit" value="Add Expense" />
      </form>

      <form onSubmit={getSummary} className={styles.form}>
        <div className={styles.input}>
          <label htmlFor="person">Which person?</label>
          <select name="person" id="person" required>
            <option value="ethan">Ethan</option>
            <option value="uyen">Cool Uyen</option>
          </select>
        </div>

        <div className={styles.input}>
          <label htmlFor="month">Which Month</label>
          <select name="month" id="month" required>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="12">December</option>
          </select>
        </div>

        <div className={styles.input}>
          <label htmlFor="year">Which Year</label>
          <input type="number" id="year" name="year" required/>
        </div>

        <input type="submit" value="Show Summary" />
      </form>

      <div className={styles.form}>
        <h1>{name}</h1>
        <h2>Summary of {date}: {amount[0]}</h2>
        <div>
          <p>Eating out: {amount[1]} ({percent[1]}%)</p>
          <p>Shopping: {amount[2]} ({percent[2]}%)</p>
          <p>Travel: {amount[3]} ({percent[3]}%)</p>
          <p>Entertainment: {amount[4]} ({percent[4]}%)</p>
          <p>Groceries: {amount[5]} ({percent[5]}%)</p>
          <p>Coffee: {amount[6]} ({percent[6]}%)</p>
          <p>Transportation: {amount[7]} ({percent[7]}%)</p>
          <p>Bills: {amount[8]} ({percent[8]}%)</p>
          <p>Investment: {amount[9]} ({percent[9]}%)</p>
          <p>Misc: {amount[10]} ({percent[10]}%)</p>
        </div>
        {transactions.map((transaction) => (
          <div key={transaction._id}>
            <p>Date: {transaction.date}</p>
            <p>Category: {transaction.category}</p>
            <p>Description: {transaction.description}</p>
            <p>Amount: {transaction.amount}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const client = await clientPromise;
  const db = await client.db('expenses');
  const ethanCollection = await db.collection('ethan');
  const uyenCollection = await db.collection('uyen');

  const ethan = await ethanCollection.find({}).toArray();
  const uyen = await uyenCollection.find({}).toArray();

  return {
    props: {
      ethan: JSON.stringify(ethan),
      uyen: JSON.stringify(uyen)
    }
  }
}

function personSelected(ethan, uyen) {
  if (ethan) {
    return "ethan"
  } else if (uyen) {
    return "uyen"
  }
}

function categorySelected(eatingout, shopping, travel, entertainment, groceries, coffee, transportation, bills, investment, misc) {
  if (eatingout) {
    return "eatingout"
  } else if (shopping) {
    return "shopping"
  } else if (travel) {
    return "travel"
  } else if (entertainment) {
    return "entertainment"
  } else if (groceries) {
    return "groceries"
  } else if (coffee) {
    return "coffee"
  } else if (transportation) {
    return "transportation"
  } else if (bills) {
    return "bills"
  } else if (investment) {
    return "investment"
  } else if (misc) {
    return "misc"
  }
}

function monthSelected(january, february, march, april, may, june, july, august, september, october, november, december) {
  if (january) {
    return "01"
  } else if (february) {
    return "02"
  } else if (march) {
    return "03"
  } else if (april) {
    return "04"
  } else if (may) {
    return "05"
  } else if (june) {
    return "06"
  } else if (july) {
    return "07"
  } else if (august) {
    return "08"
  } else if (september) {
    return "09"
  } else if (october) {
    return "10"
  } else if (november) {
    return "11"
  } else if (december) {
    return "12"
  }
}