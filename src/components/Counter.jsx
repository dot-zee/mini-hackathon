import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decrement,
  decrementByAmount,
  increment,
  incrementByAmount,
} from "../redux/features/counterSlice";
import { useNavigate } from "react-router";

const Counter = () => {
  const count = useSelector((state) => state.counter.value);

  const [amount, setAmount] = useState(0);

  const dispatch = useDispatch();

  const navigate = useNavigate()

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50 p-6">

      
      <button
        onClick={() => navigate("/")}
        className="w-100 m-20 px-28 py-14 text-3xl font-semibold text-white bg-blue-400 rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
      >
        Go Back
      </button>
      <br />

      {/* Main Card Container */}
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl shadow-gray-200/50 border border-gray-100">
        {/* Header & Number Display */}
        <div className="mb-8 text-center">
          <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
            Counter
          </h2>
          <div className="flex justify-center items-center">
            <span className="text-7xl font-extrabold tabular-nums tracking-tight text-slate-800">
              {count}
            </span>
          </div>
        </div>

        {/* Amount Controller */}
        <div className="mb-8 flex items-center justify-center gap-3">
          <label
            htmlFor="amount"
            className="text-sm font-medium text-slate-500"
          >
            Step Amount:
          </label>
          <input
            id="amount"
            type="number"
            // value={amount}
            onChange={(e) => setAmount(Number(e.target.value) || 0)}
            className="w-20 rounded-xl border-2 border-slate-100 bg-slate-50 px-3 py-2 text-center font-bold text-slate-700 outline-none transition-all focus:border-blue-500 focus:bg-white"
          />
        </div>

        {/* Action Buttons Grid */}
        <div className="grid grid-cols-2 gap-4 h-100 ">
          {/* Single Increment/Decrement */}
          <button
            onClick={() => dispatch(increment())}
            className="group rounded-2xl bg-slate-200 py-4 px-2 font-semibold text-slate-700 transition-all hover:bg-slate-300 active:scale-95"
          >
            Increment{" "}
            <span className="text-slate-400 group-hover:text-slate-600">
              (+1)
            </span>
          </button>

          <button
            onClick={() => dispatch(decrement())}
            className="group rounded-2xl bg-slate-200 py-4 px-2 font-semibold text-slate-700 transition-all hover:bg-slate-300 active:scale-95"
          >
            Decrement{" "}
            <span className="text-slate-400 group-hover:text-slate-600">
              (-1)
            </span>
          </button>

          {/* Amount Increment/Decrement */}
          <button
            onClick={() => dispatch(incrementByAmount(amount))}
            className="rounded-2xl bg-blue-600 py-4 px-2 font-bold text-white shadow-lg shadow-blue-600/30 transition-all hover:bg-blue-700 active:scale-95"
          >
            Add {amount}
          </button>

          <button
            onClick={() => dispatch(decrementByAmount(amount))}
            className="rounded-2xl bg-rose-500 py-4 px-2 font-bold text-white shadow-lg shadow-rose-500/30 transition-all hover:bg-rose-600 active:scale-95"
          >
            Subtract {amount}
          </button>
        </div>
      </div>

    </div>
  );
};

export default Counter;
