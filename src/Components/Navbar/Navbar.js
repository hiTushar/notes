import { Link, Routes, useNavigate } from "react-router-dom";
import Home from "../Home/Home";
import { useEffect, useState } from "react";

export default function Navbar() {
    return (
        <>
            <div>
                <Link to="/">Home</Link>
            </div>
            <div>
                <Link to="/notes">All Notes</Link>
            </div>
            <div>
                <Link to="/settings">Settings</Link>
            </div>
        </>
    );
}
