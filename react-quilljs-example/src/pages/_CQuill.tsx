import { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Quill.scss'

export const CustomButton = () => <span className="octicon octicon-star" />;


export const CQuill = () => {
  const [value, setValue] = useState('');

  const Quill = ReactQuill.Quill
  const Font = Quill.import('formats/font');
  Font.whitelist = ['arial', 'roboto', 'raleway', 'montserrat', 'lato', 'rubik'];
  Quill.register(Font, true);

  const Size = Quill.import('formats/size');
  Size.whitelist = [
    '9px',
    '10px',
    '11px',
    '12px',
    '14px',
    '16px',
    '18px',
    '20px',
    '22px',
    '24px',
    '26px',
    '28px'
  ];
  Quill.register(Size, true);

  const CustomToolbar = () => (
    <div id="toolbar">
      <button className="ql-bold" />
      <button className="ql-underline" />
      <select className="ql-font">
        {Font.whitelist.map((font, index) => (
          <option value={font} selected={!index}>
            {font[0].toUpperCase() + font.substr(1)}
          </option>
        ))}
      </select>
      <select className="ql-size">
        {Size.whitelist.map((size, index) => (
          <option value={size} selected={size.includes('12')}>
            {size}
          </option>
        ))}
      </select>
      <button className="ql-align" value="" />
      <button className="ql-align" value="center" />
      <button className="ql-align" value="right" />
      <select className="ql-box">
        <option selected>None</option>
        <option value="solid">Solid</option>
      </select>
    </div>
  );



  const modules = {
    toolbar: [
      [{ 'font': Font.whitelist }],
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  }
  const modules2 = {
    'toolbar': { container: '#toolbar' },
    'image-tooltip': true
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ]

  const handleChange = (html) => {
    console.log(html)
    const x = `<p class='ql-font-roboto'>Hola Roboto</p><span>-Normal Fuente</span>`
    setValue(x)
  }

  return (<>
    <h2>Quill</h2>

    <div id="toolbar">
      <select className="ql-font">
        <option selected>Aref Ruqaa</option>
        <option value="mirza">Mirza</option>
        <option value="roboto">Roboto</option>
      </select>
    </div>

    <ReactQuill
      theme="snow"
      value={value}
      onChange={handleChange}
      /* onChange={(e) => handleChange(e)} */
      modules={modules}
      formats={formats}
      bounds={'#editor'}
    />
    <div id="editor"></div>
    {/*  <div id="container" style={{
      border: '1px solid #000'
    }}>

      <div id="toolbar">
        < span className="ql-bold ql-format-button"></span>
        <button className="ql-italic">Italic</button>
        <select title="Font" className="ql-font">
          <option value="sans-serif">Sans Serif</option>
          <option value="Georgia, serif">Serif</option>
          <option id="normalFont" value="Monaco, 'Courier New', monospace" selected>Monospace</option>
        </select>
        <select title="Size" className="ql-size">
          <option value="10px">Small</option>
          <option value="13px">Normal</option>
          <option value="18px" selected>Large</option>
          <option value="32px">Huge</option>
        </select>
      </div >


      <div id="editor" style={{ height: '200px' }}>

      </div>

    </div >
 */}
  </>)
}