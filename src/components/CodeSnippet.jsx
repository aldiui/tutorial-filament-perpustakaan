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
            <pre className="mockup-code">
                <code>{children}</code>
            </pre>
        </div>
    );
};

export default CodeSnippet;
