import { useState } from "react"

type InputBoxProps = {
          name: string,
          type: 'text' | 'email' | 'password'
          id?: string,
          value?: string,
          placeholder: string,
          icon: string
}

export default function InputBox({ name, type, id, value, placeholder, icon }: InputBoxProps) {
          const [showPassword, setShowPassword] = useState<boolean>(false)

          return (
                    <div className="relative w-[100%] mb-4">
                              <input
                                        className="input-box"
                                        type={type === 'password' && showPassword ? 'text' : type}
                                        id={id}
                                        name={name}
                                        defaultValue={value}
                                        placeholder={placeholder}
                              />
                              <i className={`fi ${icon} input-icon`}></i>

                              {
                                        type === 'password' && <i className={`fi ${showPassword ? "fi-rr-eye" : "fi-rr-eye-crossed"} input-icon left-[auto] right-4 cursor-pointer`}
                                                  onClick={() => setShowPassword(!showPassword)}
                                        ></i>
                              }
                    </div>
          )
}