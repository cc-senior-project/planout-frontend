import axios from "axios";
import router from "next/router";
import React, { useState } from "react";

import TaskModal from "../tasks/TaskModal";
import useAuth from "../../src/hook/auth";
import { FaPlusCircle } from "react-icons/fa";

export default function TaskForm({ getTasks }: any) {
  const [showModal, setShowModal] = useState(false);
  const [taskDescription, setTaskDescription] = useState("");
  const [taskCost, setTaskCost] = useState("0");
  const { token, user } = useAuth() as any;

  const createTask = () => {
    const dataObj = {
      description: taskDescription,
      status: false,
      event_id: router.query.id,
      user_id: user.uid,
      cost: taskCost,
    };
    submitPostReq(dataObj);
  };

  const submitPostReq = async (data: object) => {
    try {
      await axios.post(`https://cc26-planout.herokuapp.com/tasks`, data, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <FaPlusCircle
        data-modal-toggle="small-modal"
        onClick={() => setShowModal(true)}
        className="float-right md:mr-36 text-2xl hover:cursor-pointer hover:fill-orange-300"
      />

      {showModal && (
        <TaskModal
          setShowModal={setShowModal}
          setTaskDescription={setTaskDescription}
          setTaskCost={setTaskCost}
          createTask={createTask}
          getTasks={getTasks}
        />
      )}
    </div>
  );
}
