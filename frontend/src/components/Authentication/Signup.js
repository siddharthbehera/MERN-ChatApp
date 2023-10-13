import {FormControl, FormLabel} from "@chakra-ui/form-control";
import {Input, InputGroup, InputRightElement} from "@chakra-ui/input";
import { VStack } from "@chakra-ui/layout";
import { useState } from 'react';
import axios from "axios";
import { useHistory } from "react-router";
import { useToast } from "@chakra-ui/toast"
import { Button } from "@chakra-ui/button";

const Signup = () => {
  const [show, setShow] = useState(false)
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false)
  const toast = useToast();
  const history = useHistory();

  const handleClick =() => setShow(!show);

  const postDetails = (pics) => {};

  const submitHandler = async () => {
    setLoading(true);
    if(!name || !email || !password || !confirmpassword){
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration :5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if(password !== confirmpassword){
      toast({
        title:"Password Do Not Match",
        status: "warning",
        duration:5000,
        isCloasable: true,
        position: "bottom",
      });
      return;
    }

    try{
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const {data} = await axios.post(
        "/api/user",
        {name, email, password, pic},
        config
      );

      toast({
        title:"Registration Successful",
        status: "success",
        duration:5000,
        isCloasable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));

      setLoading(false);
      history.push('/chats');
    } catch (error){
      
      toast({
        title:"Error Occured!",
        description: error.response.data.message,
        status: "error",
        duration:5000,
        isCloasable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing='5px'>
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder="Enter Your Name"
          onChange={(e)=> setName(e.target.value)}
        />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>Enter Your Email</FormLabel>
        <Input
          placeholder="Email id"
          onChange={(e)=> setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Password"
            onChange={(e)=> setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl id='password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Confirm Password"
            onChange={(e)=> setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* <FormControl id="pic">
        <FormLabel>Upload Your Picture</FormLabel>
        <input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e)=> postDetails(e.target.files[0])}
        />
      </FormControl> */}
      
      <Button
        colorScheme="blue"
        width="100%"
        color="white"
        style={{marginTop:15}}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  )
}

export default Signup