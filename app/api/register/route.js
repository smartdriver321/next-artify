import { connectToDB } from '@mongodb/database'
import { NextResponse } from 'next/server'
import { hash } from 'bcryptjs'
import { writeFile } from 'fs/promises'
import User from '@models/User'

/** USER REGISTER */
export async function POST(req) {
  try {
    /** Connect to MongoDB */
    await connectToDB()

    const data = await req.formData()

    /** Take information from the form */
    const username = data.get('username')
    const email = data.get('email')
    const password = data.get('password')
    const file = data.get('profileImage')

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const profileImagePath = `C:/Users/user/Documents/ecommerce_projects/next-artify/public/uploads/${file.name}`
    await writeFile(profileImagePath, buffer)

    console.log(`open ${profileImagePath} to see the uploaded files`)

    /** Check if user exist */
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exist!' },
        { status: 409 }
      )
    }

    /** Hash the password */
    const saltRoounds = 10
    const hashedPassword = await hash(password, saltRoounds)

    /** Create a new user */
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      profileImagePath: `/uploads/${file.name}`,
    })

    /** Save new user */
    await newUser.save()

    /** Send a success message */
    return NextResponse.json(
      { message: 'User registered succesfully', user: newUser },
      { status: 200 }
    )
  } catch (err) {
    console.log(err)
    return NextResponse.json(
      { message: 'Fail to create new user' },
      { status: 500 }
    )
  }
}
