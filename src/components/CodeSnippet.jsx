import { useState } from "react";
import { Copy } from "lucide-react";
import { CopyToClipboard } from "react-copy-to-clipboard";

const CodeSnippet = ({ children, language }) => {
    const [copyTip, setCopyTip] = useState("Copy code");

    const handleCopy = () => {
        setCopyTip("Copied");
        setTimeout(() => setCopyTip("Copy code"), 500);
    };

    return (
        <div className="relative overflow-x-hidden">
            {/* <CopyToClipboard text={children} onCopy={handleCopy}>
                    <button className="tooltip tooltip-left absolute z-40 right-0 mr-2 mt-5" data-tip={copyTip} aria-label="Copy code">
                        <Copy className="h-5 w-5 text-white cursor-pointer hover:text-blue-600" />
                    </button>
                </CopyToClipboard> */}
            <span className="absolute z-40 bottom-0 right-0 mb-5 mr-1 rounded-lg bg-base-content/40 p-1 text-xs uppercase text-base-300 backdrop-blur-sm">{language}</span>
            <pre className="mockup-code">
                <code>{children}</code>
            </pre>
        </div>
    );
};

export default CodeSnippet;
