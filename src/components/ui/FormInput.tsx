interface FormInputProps {
  type?: 'text' | 'email'
  id: string
  name: string
  placeholder: string
  required?: boolean
  as?: 'input' | 'textarea'
  rows?: number
}

const baseStyles =
  'w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-neutral-500 transition-colors outline-none focus:border-white/30 focus:bg-white/10'

export function FormInput({
  type = 'text',
  id,
  name,
  placeholder,
  required = false,
  as = 'input',
  rows = 4,
}: FormInputProps) {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {placeholder}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          rows={rows}
          className={`${baseStyles} resize-none`}
        />
      ) : (
        <input
          type={type}
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          className={baseStyles}
        />
      )}
    </div>
  )
}
