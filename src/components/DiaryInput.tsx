import '../styles/global.css';

interface DiaryInput {
  text: string;
  placeholder: string;
  type: "input" | "textArea";
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

function DiaryInput({text,type,placeholder,onChange}:DiaryInput) {

  return (
    <li className='list-none w-full'>
      {type === "textArea" ?(
        <textarea className='bg-transparent border border-solid border-[var(--logo-green)]' 
        value={text}
        onChange={onChange}
        placeholder={placeholder}
        />
      ) : (
        <input className='bg-transparent w-full border-b border-solid border-[var(--logo-green)] '
        value={text}
        onChange={onChange}
        placeholder={placeholder}
        />
      )}
    </li>
  )

}



export default DiaryInput