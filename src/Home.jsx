import { useState } from 'react'
import Draggable from 'react-draggable'
// import { Resizable } from 're-resizable'
import { ResizableBox } from 'react-resizable'
import fontFamilies from './FontFamilies'
import { Resizable } from 're-resizable'

const FontSizes = [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 36, 40, 44, 48, 55, 60]

const Home = () => {
    const [textBoxes, setTextBoxes] = useState([])
    const [selectedBox, setSelectedBox] = useState(null);
    const [text, setText] = useState('Text Sample');
    const [position, setPosition] = useState({ x: 1, y: 2, width: 180, height: 100 });
    const [font, setFont] = useState({ family: 'Poppins', size: 14, style: 'Regular' });
    const [alignment, setAlignment] = useState('left');
    const [fill, setFill] = useState({ color: '#000000', opacity: 100 });
    const [stroke, setStroke] = useState({ color: '#000000', opacity: 100 });
    const [bold, setBold] = useState(false)
    const [italic, setItalic] = useState(false)
    const [underline, setUnderline] = useState(false)
    const [width, setwidth] = useState(200)
    const [height, setheight] = useState(200)
    console.log(textBoxes);


    const handleAddTextBox = () => {
        const newBox = {
            id: Date.now(),
            text: 'Text Sample',
            x: position.x,
            y: position.y,
            width: position.width,
            height: position.height,
            size: font.size,
            color: fill.color,
            bold: bold,
            italic: italic,
            style: font.style,
            alignment: alignment,
        };
        setTextBoxes([...textBoxes, newBox]);

    };

    const handleUpdateTextBox = (id, updates) => {
        setTextBoxes(textBoxes.map(box => box.id === id ? { ...box, ...updates } : box));
    };

    const handleDeleteTextBox = (id) => {
        setTextBoxes(textBoxes.filter(box => box.id !== id));
    };

    const boldHandler = () => {
        setBold(!bold)
    }
    const italicHandler = () => {
        setItalic(!italic)
    }
    const underlineHandler = () => {
        setUnderline(!underline)
    }
    return (
        <div className="home-container d-flex align-items-center justify-content-between">
            <div className="video-section">
                <video src="./src/assets/videoplayback.mp4" controls></video>
                {textBoxes.map((box) => (
                    <Draggable
                        key={box.id}
                        defaultPosition={{ x: box.x, y: box.y }}
                        onStop={(e, data) =>
                            handleUpdateTextBox(box.id, { x: data.x, y: data.y })
                        }
                    >
                        <Resizable
                            width={box.width}
                            height={box.height}
                            minConstraints={[100, 20]}

                            onResizeStop={(e, data) => handleUpdateTextBox(box.id, { width: data.width, height: data.height })}
                        >
                            <textarea
                                className="text-box"
                                onChange={(e) => setText(e.target.value)}
                                style={{
                                    top: `${position.y}px`,
                                    left: `${position.x}px`,
                                    width: `${position.width}px`,
                                    height: `${position.height}px`,
                                    fontFamily: font.family,
                                    fontSize: `${font.size}px`,
                                    fontStyle: font.style.toLowerCase(),
                                    color: fill.color,
                                    textAlign: alignment,
                                    opacity: fill.opacity / 100,
                                    WebkitTextStroke: `1px ${stroke.color}`,
                                    fontWeight: bold ? 'bold' : 'normal',
                                    textDecoration: underline ? 'underline' : 'none',
                                    fontStyle: italic ? "italic" : "normal"
                                }}
                                rows={2}
                            >
                                {text}
                            </textarea>
                            <i className='fa-solid fa-trash cursor' style={{ position: 'absolute', top: '-10px', right: 0, fontSize: '22px'}}
                                onClick={() => handleDeleteTextBox(box.id)} ></i>
                        </Resizable>
                    </Draggable>
                ))}
            </div>
            <div className="config-section">
                <button type='button' className='d-block mx-auto btn btn-dark px-4' onClick={handleAddTextBox}>Add Text</button>
                <hr style={{ border: '1px solid' }} />
                <h6>Position</h6>
                <div className='pos d-flex align-items-center justify-content-between'>
                    <div className='d-flex gap-3'>
                        <label htmlFor="x">X</label>
                        <input type="number" value={position.x}
                            className='text-center border-radius'
                            onChange={(e) => setPosition({ ...position, x: e.target.value })} style={{ width: '50px', background: '#d6d6d6', border: '0', outline: 'none' }} />
                    </div>
                    <div className='d-flex gap-3'>
                        <label htmlFor="y">Y</label>
                        <input type="number" value={position.y}
                            className='text-center border-radius'
                            onChange={(e) => setPosition({ ...position, y: e.target.value })} style={{ width: '50px', background: '#d6d6d6', border: '0', outline: 'none' }} />
                    </div>
                </div>
                <div className='my-3 width d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center justify-content-center gap-2'>
                        <label htmlFor="w">W</label>
                        <input type="number" id='w'
                            className='text-center border-radius'
                            value={position.width}
                            onChange={(e) => setPosition({ ...position, width: e.target.value })} style={{ width: '50px', background: '#d6d6d6', border: '0', outline: 'none' }} />
                    </div>
                    <div className='d-flex gap-3'>
                        <label htmlFor="h">H</label>
                        <input type="number" id='h' value={position.height}
                            className='text-center border-radius'
                            onChange={(e) => setPosition({ ...position, height: e.target.value })} style={{ width: '50px', background: '#d6d6d6', border: '0', outline: 'none' }} />
                    </div>
                </div>
                <hr style={{ border: '1px solid' }} />
                <h6>Text</h6>
                <select name="" id="" className='my-2 p-2 cursor border-radius' value={font.family} onChange={(e) => setFont({ ...font, family: e.target.value })} style={{ width: '100%', background: '#d6d6d6', border: '0', outline: 'none' }}>
                    {fontFamilies.map((family, index) => (
                        <option key={index} value={family}>{family}</option>
                    ))}
                </select>
                <div className='d-flex gap-3'>
                    <select name="" id="" className='p-2 cursor border-radius' value={font.style} onChange={(e) => setFont({ ...font, style: e.target.value })} style={{ width: '50%', background: '#d6d6d6', border: '0', outline: 'none' }}>
                        <option value="Regular">Regular</option>
                        <option value="Bold">Bold</option>
                    </select>
                    <select name="" id="" className='cursor border-radius' value={font.size} onChange={(e) => setFont({ ...font, size: +e.target.value })} style={{ width: '45%', background: '#d6d6d6', border: '0', outline: 'none' }}>
                        {FontSizes.map((size, index) => (
                            <option key={index} value={size}>
                                {size}
                            </option>
                        ))}


                    </select>
                </div>
                <div className='d-flex align-items-center justify-content-between my-3 '>
                    <div className='d-flex justify-content-center gap-3  p-2 border-radius' style={{ background: '#d6d6d6', border: '0', outline: 'none', width: '45%' }}>
                        <span className='cursor' onClick={() => setAlignment('left')}><i className="fa-solid fa-align-left"></i></span>
                        <span className='cursor' onClick={() => setAlignment('center')}><i className="fa-solid fa-align-center"></i></span>
                        <span className='cursor' onClick={() => setAlignment('right')}><i className="fa-solid fa-align-right"></i></span>
                    </div>
                    <div className='d-flex justify-content-center gap-3 p-2 border-radius' style={{ background: '#d6d6d6', border: '0', outline: 'none', width: '45%' }}>
                        <span className="cursor" style={{ fontWeight: bold ? 'normal' : 'bold' }} onClick={boldHandler}>B</span>
                        <i className='cursor fw-700' onClick={italicHandler}>I</i>
                        <u className='cursor fw-600' onClick={underlineHandler}>U</u>
                    </div>
                </div>
                <h6>Fill</h6>
                <div className='d-flex align-items-center justify-content-between p-2 border-radius' style={{ background: '#d6d6d6', border: '0', outline: 'none' }}>
                    <input
                        type="color"
                        value={fill.color}
                        onChange={(e) => setFill({ ...fill, color: e.target.value })}
                        className='cursor'
                    />
                    {fill.color}
                    <input
                        type="number"
                        value={fill.opacity}
                        onChange={(e) => setFill({ ...fill, opacity: +e.target.value })}
                        placeholder="Opacity"
                        max={100}
                        min={0}
                        className='cursor'
                    />
                </div>
                <h6>Stroke</h6>
                <div className='d-flex align-items-center justify-content-between p-2 border-radius' style={{ background: '#d6d6d6', border: '0', outline: 'none' }}>
                    <input
                        type="color"
                        value={stroke.color}
                        onChange={(e) => setStroke({ ...stroke, color: e.target.value })}
                        className='cursor'
                    />
                    {stroke.color}
                    <input
                        type="number"
                        value={stroke.opacity}
                        onChange={(e) => setStroke({ ...stroke, opacity: +e.target.value })}
                        placeholder="Opacity"
                        max={100}
                        min={0}
                        className='cursor'
                    />
                </div>
            </div>

        </div>

    )
}

export default Home