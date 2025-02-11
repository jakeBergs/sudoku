import React, { useState } from "react";

const TestComponent = () => {
    const [count, setCount] = useState<number>(0);

    interface ButtonProps {
        onClick: () => void;
        style?: React.CSSProperties;
        children?: React.ReactNode;
    }

    const Button: React.FC<ButtonProps> = ({ onClick, style }) => (
        <button onClick={onClick} style={style}>Click me</button>
    );

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h2>Counter: {count}</h2>
            <Button onClick={() => setCount(count + 1)}>Increment</Button>
            <Button onClick={() => setCount(count - 1)} style={{ marginLeft: "10px" }}>
                Decrement
            </Button>
        </div>
    );
};

export default TestComponent;
