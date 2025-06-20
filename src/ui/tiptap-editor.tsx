import { useCallback, useState } from 'react'
import { FiShare2 } from 'react-icons/fi';
import { FiDownload } from 'react-icons/fi';
import { FaFilePdf, FaFileWord, FaFileImage } from 'react-icons/fa';

import RichTextEditor, { BaseKit } from 'reactjs-tiptap-editor'

import { locale } from 'reactjs-tiptap-editor/locale-bundle'
import {
  BubbleMenuTwitter,
  BubbleMenuKatex,
  BubbleMenuExcalidraw,
  BubbleMenuMermaid,
  BubbleMenuDrawer
} from 'reactjs-tiptap-editor/bubble-extra';

import { Attachment } from 'reactjs-tiptap-editor/attachment';
import { Blockquote } from 'reactjs-tiptap-editor/blockquote';
import { Bold } from 'reactjs-tiptap-editor/bold';
import { BulletList } from 'reactjs-tiptap-editor/bulletlist';
import { Clear } from 'reactjs-tiptap-editor/clear';
import { Code } from 'reactjs-tiptap-editor/code';
import { CodeBlock } from 'reactjs-tiptap-editor/codeblock';
import { Color } from 'reactjs-tiptap-editor/color';
import { ColumnActionButton } from 'reactjs-tiptap-editor/multicolumn';
import { Emoji } from 'reactjs-tiptap-editor/emoji';
import { ExportPdf } from 'reactjs-tiptap-editor/exportpdf';
import { ExportWord } from 'reactjs-tiptap-editor/exportword';
import { FontFamily } from 'reactjs-tiptap-editor/fontfamily';
import { FontSize } from 'reactjs-tiptap-editor/fontsize';
import { FormatPainter } from 'reactjs-tiptap-editor/formatpainter';
import { Heading } from 'reactjs-tiptap-editor/heading';
import { Highlight } from 'reactjs-tiptap-editor/highlight';
import { History } from 'reactjs-tiptap-editor/history';
import { HorizontalRule } from 'reactjs-tiptap-editor/horizontalrule';
import { Iframe } from 'reactjs-tiptap-editor/iframe';
import { Image } from 'reactjs-tiptap-editor/image';
import { ImageGif } from 'reactjs-tiptap-editor/imagegif';
import { ImportWord } from 'reactjs-tiptap-editor/importword';
import { Indent } from 'reactjs-tiptap-editor/indent';
import { Italic } from 'reactjs-tiptap-editor/italic';
import { LineHeight } from 'reactjs-tiptap-editor/lineheight';
import { Link } from 'reactjs-tiptap-editor/link';
import { Mention } from 'reactjs-tiptap-editor/mention';
import { MoreMark } from 'reactjs-tiptap-editor/moremark';
import { OrderedList } from 'reactjs-tiptap-editor/orderedlist';
import { SearchAndReplace } from 'reactjs-tiptap-editor/searchandreplace';
import { SlashCommand } from 'reactjs-tiptap-editor/slashcommand';
import { Strike } from 'reactjs-tiptap-editor/strike';
import { Table } from 'reactjs-tiptap-editor/table';
import { TableOfContents } from 'reactjs-tiptap-editor/tableofcontent';
import { TaskList } from 'reactjs-tiptap-editor/tasklist';
import { TextAlign } from 'reactjs-tiptap-editor/textalign';
import { TextUnderline } from 'reactjs-tiptap-editor/textunderline';
import { Video } from 'reactjs-tiptap-editor/video';
import { TextDirection } from 'reactjs-tiptap-editor/textdirection';
import { Katex } from 'reactjs-tiptap-editor/katex';
import { Drawer } from 'reactjs-tiptap-editor/drawer';
import { Excalidraw } from 'reactjs-tiptap-editor/excalidraw';
import { Twitter } from 'reactjs-tiptap-editor/twitter';
import { Mermaid } from 'reactjs-tiptap-editor/mermaid';
import 'reactjs-tiptap-editor/style.css'
import 'prism-code-editor-lightweight/layout.css';
import "prism-code-editor-lightweight/themes/github-dark.css"
import 'katex/dist/katex.min.css'
import 'easydrawer/styles.css'
import '../styles/editor.css'




function convertBase64ToBlob(base64: string) {
    const arr = base64.split(',')
    const mime = arr[0].match(/:(.*?);/)![1]
    const bstr = atob(arr[1])
    let n = bstr.length
    const u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }
  
  const extensions = [
    BaseKit.configure({
      placeholder: {
        showOnlyCurrent: true,
      },
      characterCount: {
        limit: 50_000,
      },
    }),
    History,
    SearchAndReplace,
    TableOfContents,
    FormatPainter.configure({ spacer: true }),
    Clear,
    FontFamily,
    Heading.configure({ spacer: true }),
    FontSize,
    Bold,
    Italic,
    TextUnderline,
    Strike,
    MoreMark,
    Emoji,
    Color.configure({ spacer: true }),
    Highlight,
    BulletList,
    OrderedList,
    TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
    Indent,
    LineHeight,
    TaskList.configure({
      spacer: true,
      taskItem: {
        nested: true,
      },
    }),
    Link,
    Image.configure({
      upload: (files: File) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(URL.createObjectURL(files))
          }, 500)
        })
      },
    }),
    Video.configure({
      upload: (files: File) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(URL.createObjectURL(files))
          }, 500)
        })
      },
    }),
    ImageGif.configure({
    //   GIPHY_API_KEY: import.meta.env.VITE_GIPHY_API_KEY as string,
    }),
    Blockquote,
    SlashCommand,
    HorizontalRule,
    Code.configure({
      toolbar: false,
    }),
    CodeBlock,
    ColumnActionButton,
    Table,
    Iframe,
    ExportPdf.configure({ spacer: true }),
    ImportWord.configure({
      upload: (files: File[]) => {
        const f = files.map(file => ({
          src: URL.createObjectURL(file),
          alt: file.name,
        }))
        return Promise.resolve(f)
      },
    }),
    ExportWord,
    TextDirection,
    Mention,
    Attachment.configure({
      upload: (file: any) => {
        // fake upload return base 64
        const reader = new FileReader()
        reader.readAsDataURL(file)
  
        return new Promise((resolve) => {
          setTimeout(() => {
            const blob = convertBase64ToBlob(reader.result as string)
            resolve(URL.createObjectURL(blob))
          }, 300)
        })
      },
    }),
  
    Katex,
    Excalidraw,
    Mermaid.configure({
      upload: (file: any) => {
        // fake upload return base 64
        const reader = new FileReader()
        reader.readAsDataURL(file)
  
        return new Promise((resolve) => {
          setTimeout(() => {
            const blob = convertBase64ToBlob(reader.result as string)
            resolve(URL.createObjectURL(blob))
          }, 300)
        })
      },
    }),
    Drawer.configure({
      upload: (file: any) => {
        // fake upload return base 64
        const reader = new FileReader()
        reader.readAsDataURL(file)
  
        return new Promise((resolve) => {
          setTimeout(() => {
            const blob = convertBase64ToBlob(reader.result as string)
            resolve(URL.createObjectURL(blob))
          }, 300)
        })
      },
    }),
    Twitter,
  ]
  
  const DEFAULT = {
    "type": "doc",
    "content": [
      {
        "type": "heading",
        "attrs": {
          "level": 1
        },
        "content": [
          {
            "type": "text",
            "text": "History of India"
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Ancient India"
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "Indus Valley Civilization"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "The history of India dates back to ancient times, with one of the earliest known civilizations being the Indus Valley Civilization. Flourishing around 2600-1900 BCE, this civilization was located in what is now modern-day Pakistan and northwest India. Known for its advanced urban planning, sophisticated drainage systems, and intricate trade networks, the Indus Valley Civilization is a testament to the early ingenuity of Indian civilization."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "Vedic Period"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "Following the decline of the Indus Valley Civilization, the Vedic Period emerged around 1500-500 BCE. This period is characterized by the composition of the Vedas, ancient sacred texts that form the foundation of Hinduism. The Vedic people were pastoral nomads who eventually settled in the Gangetic plains, establishing early forms of governance and social structures that laid the groundwork for future Indian society."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "Maurya Empire"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "The Maurya Empire, founded by Chandragupta Maurya in 322 BCE, marked a significant period in Indian history. Under the rule of Emperor Ashoka, the Maurya Empire expanded to encompass most of the Indian subcontinent. Ashoka's conversion to Buddhism and his promotion of non-violence and social welfare policies left a lasting impact on Indian culture and governance. The Maurya Empire is remembered for its administrative innovations, including the establishment of a centralized bureaucracy and a network of roads connecting the empire."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 2
        },
        "content": [
          {
            "type": "text",
            "text": "Medieval India"
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "Delhi Sultanate"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "The Delhi Sultanate, established in 1206 by Qutb-ud-din Aibak, marked the beginning of medieval India. This period saw the influx of Islamic culture and governance in the Indian subcontinent. The Delhi Sultanate was characterized by a series of Turkic and Afghan dynasties ruling from Delhi, bringing significant changes to Indian society, architecture, and administration. Notable rulers of the Delhi Sultanate include Alauddin Khilji and Muhammad bin Tughlaq, known for their military conquests and administrative reforms."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "Mughal Empire"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "The Mughal Empire, founded by Babur in 1526, marked a golden age in Indian history. The Mughals, of Central Asian descent, established a powerful empire known for its cultural richness, architectural marvels, and religious tolerance. Under emperors like Akbar, Jahangir, and Shah Jahan, the Mughal Empire reached its zenith, with achievements in art, literature, and governance. The Taj Mahal, a UNESCO World Heritage Site, stands as a symbol of Mughal architectural brilliance and love."
          }
        ]
      },
      {
        "type": "heading",
        "attrs": {
          "level": 3
        },
        "content": [
          {
            "type": "text",
            "text": "Vijayanagara Empire"
          }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          {
            "type": "text",
            "text": "The Vijayanagara Empire, founded in 1336 by Harihara and Bukka, was a powerful South Indian empire that flourished in the Deccan region. Known for its grandeur and military prowess, the Vijayanagara Empire played a crucial role in preserving Hindu culture and traditions during a period of Islamic invasions. The empire's capital, Hampi, was a center of art, architecture, and trade, attracting merchants and travelers from far and wide. The fall of the Vijayanagara Empire in 1565 marked the end of an era but left a lasting legacy in South Indian history."
          }
        ]
      }
    ]
  }
  
  function debounce(func: any, wait: number) {
    let timeout: NodeJS.Timeout
    return function (...args: any[]) {
      clearTimeout(timeout)
      // @ts-ignore
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

const DocEditor = () => {
    const [content, setContent] = useState(() => {
        // Try to get content from localStorage on initial load
        const savedContent = localStorage.getItem('editorContent');
        try {
          return savedContent ? JSON.parse(savedContent) : DEFAULT;
        } catch (e) {
          return DEFAULT;
        }
      });
    const [theme, setTheme] = useState('light')
    const [disable, setDisable] = useState(false)
    const [title, setTitle] = useState('Untitled Document')
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [downloadLang, setDownloadLang] = useState('English (By default)');
    const [downloadPages, setDownloadPages] = useState('All Pages (1-8)');
    const [downloadType, setDownloadType] = useState('PDF');
    
    const onValueChange = useCallback(
        debounce((value: any) => {
          setContent(value);
          // Save to localStorage whenever content changes
          try {
            localStorage.setItem('editorContent', JSON.stringify(value));
          } catch (e) {
            console.error('Failed to save content to localStorage:', e);
          }
        }, 300),
        [],
    )

    const handleShare = () => {
        // Implement share functionality
        console.log('Share clicked')
    }

    const handleModify = () => {
        setDisable(!disable)
    }

    const handleDownload = () => {
        setShowDownloadModal(true);
    }

    const closeDownloadModal = () => setShowDownloadModal(false);
    const handleDownloadConfirm = () => {
        // Implement actual download logic here
        setShowDownloadModal(false);
    }
    
    return (
        <div
            className=" flex flex-col w-full max-w-screen-lg gap-[24px] mx-[auto] my-0"
            style={{
                maxWidth: 1024,
            }}
        >
            {/* Top Bar */}
            <div className="flex items-center justify-between border-b border-[#e5e7eb]   mb-6 relative min-h-[56px]">
                {/* Centered Title */}
                <div className="absolute left-0 right-0 flex justify-center pointer-events-none">
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="text-base sm:text-lg md:text-xl font-semibold text-center bg-transparent border-none focus:outline-none focus:ring-0 px-2 pointer-events-auto w-full max-w-lg truncate"
                        style={{
                            boxShadow: 'none',
                        }}
                        placeholder="Untitled Document"
                    />
                </div>
                {/* Right Buttons */}
                <div className="flex gap-2 ml-auto z-10">
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 border border-[#e5e7eb] bg-white hover:bg-[#f3f4f6] text-gray-700 font-medium rounded-md px-3 py-1.5 transition-colors"
                    >
                        <FiShare2 className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handleModify}
                        className="flex items-center gap-2 border border-[#e5e7eb] bg-white hover:bg-[#f3f4f6] text-gray-700 font-medium rounded-md px-3 py-1.5 transition-colors"
                    >
                        Modify
                    </button>
                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 border border-[#e5e7eb] bg-white hover:bg-[#f3f4f6] text-gray-700 font-medium rounded-md px-3 py-1.5 transition-colors"
                    >
                        <FiDownload className="w-5 h-5" />
                        Download
                    </button>
                </div>
            </div>

            {/* Download Modal */}
            {showDownloadModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-xs p-6 relative animate-fade-in">
                        <button onClick={closeDownloadModal} className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 text-xl">×</button>
                        <h2 className="font-semibold text-lg mb-4">Download your project</h2>
                        <div className="mb-3">
                            <label className="block text-xs font-medium mb-1">Choose language</label>
                            <select value={downloadLang} onChange={e => setDownloadLang(e.target.value)} className="w-full border rounded px-2 py-1 text-sm">
                                <option>English (By default)</option>
                                <option>Hindi</option>
                                <option>Spanish</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <select value={downloadPages} onChange={e => setDownloadPages(e.target.value)} className="w-full border rounded px-2 py-1 text-sm">
                                <option>All Pages (1-8)</option>
                                <option>Page 1</option>
                                <option>Page 2</option>
                                <option>Page 3</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <div className="flex flex-col gap-1">
                                <button onClick={() => setDownloadType('DOCX')} className={`flex items-center gap-2 px-2 py-2 rounded ${downloadType==='DOCX' ? 'bg-gray-100 border border-blue-400' : 'hover:bg-gray-50'} text-left`}> <FaFileWord className="text-blue-500" /> <div><div className="font-medium text-xs">DOCX</div><div className="text-xs text-gray-500">Ideal for digital sharing and editable content</div></div></button>
                                <button onClick={() => setDownloadType('PDF')} className={`flex items-center gap-2 px-2 py-2 rounded ${downloadType==='PDF' ? 'bg-gray-100 border border-blue-400' : 'hover:bg-gray-50'} text-left`}> <FaFilePdf className="text-red-500" /> <div><div className="font-medium text-xs">PDF</div><div className="text-xs text-gray-500">Best for sharing and printing documents</div></div></button>
                                <button onClick={() => setDownloadType('JPEG')} className={`flex items-center gap-2 px-2 py-2 rounded ${downloadType==='JPEG' ? 'bg-gray-100 border border-blue-400' : 'hover:bg-gray-50'} text-left`}> <FaFileImage className="text-blue-400" /> <div><div className="font-medium text-xs">JPEG</div><div className="text-xs text-gray-500">Best for sharing and space saving</div></div></button>
                                <button onClick={() => setDownloadType('PNG')} className={`flex items-center gap-2 px-2 py-2 rounded ${downloadType==='PNG' ? 'bg-gray-100 border border-blue-400' : 'hover:bg-gray-50'} text-left`}> <FaFileImage className="text-yellow-500" /> <div><div className="font-medium text-xs">PNG</div><div className="text-xs text-gray-500">Ideal for digital sharing and complex images</div></div></button>
                            </div>
                        </div>
                        <button onClick={handleDownloadConfirm} className="w-full mt-2 bg-[#1a2747] hover:bg-[#223366] text-white font-semibold py-2 rounded flex items-center justify-center gap-2"><FiDownload /> Download</button>
                    </div>
                </div>
            )}

            <RichTextEditor
              output="json"
              
              content={content as any}
              onChangeContent={onValueChange}
              extensions={disable ? [] : extensions}
              dark={theme === 'dark'}
              disabled={disable}
              hideToolbar={disable}
             
              bubbleMenu={{
                render({ extensionsNames, editor, disabled }, bubbleDefaultDom) {
                  return <>
                    {bubbleDefaultDom}

                    {extensionsNames.includes('twitter') ? <BubbleMenuTwitter disabled={disabled}
                      editor={editor}
                      key="twitter"
                    /> : null}
                    {extensionsNames.includes('katex')  ? <BubbleMenuKatex disabled={disabled}
                      editor={editor}
                      key="katex"
                    /> : null}
                    {extensionsNames.includes('excalidraw')  ? <BubbleMenuExcalidraw disabled={disabled}
                      editor={editor}
                      key="excalidraw"
                    /> : null}
                    {extensionsNames.includes('mermaid')  ? <BubbleMenuMermaid disabled={disabled}
                      editor={editor}
                      key="mermaid"
                    /> : null}
                    {extensionsNames.includes('drawer')  ? <BubbleMenuDrawer disabled={disabled}
                      editor={editor}
                      key="drawer"
                    /> : null}
                  </>
                },
              }}
            />

            {typeof content === 'object' && (
              <textarea
                style={{
                  marginTop: 20,
                  height: 500,
                }}
                readOnly
                value={JSON.stringify(content, null, 2)}
              />
            )}
        </div>
    )
}

export default DocEditor    