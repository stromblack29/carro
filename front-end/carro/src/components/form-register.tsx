import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { FormControl, FormLabel, Radio, RadioGroup } from "@mui/material";
import DatePickerValue, { ChildrenHandle } from "./datepicker";
import axios from "axios";

export default function FormRegister () {
    const [value, setValue] = React.useState('male');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setValue((event.target as HTMLInputElement).value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const obj = {
            Name: data.get('firstName') + ' ' + data.get("lastName"),
            Email: data.get("email"),
            UserName: data.get("email"),
            UserPassword: data.get("password"),
            Telephone: data.get("telephone"),
            Gender: value,
            DateOfBirth: pickerRef.current?.getChildState().date.format('YYYY-MM-DDThh:mm:ss')
        };
        console.log(obj);
        axios
        .post('https://localhost:7073/api/User/register', obj)
        .then((response) => gotoLogin())
        .catch((error) => console.log(error.message))
        .finally(() => console.log('finish'));
      };
    const router = useRouter();
    const gotoLogin = () => {
        router.push('/');
    }
    const pickerRef = React.useRef<ChildrenHandle>(null);
    return (
        <React.Fragment>
            <Grid container component="main" sx={{ height: "100vh", justifyContent: 'center' }}>
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                        my: 8,
                        mx: 4,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        }}
                    >
                        <Typography component="h1" variant="h5">
                        Sign up
                        </Typography>
                        <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 3 }}
                        >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Last Name"
                                    name="lastName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="telephone"
                                    label="Telephone"
                                    name="telephone"
                                    autoComplete="telephone"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl>
                                    <FormLabel id="label-radio-gender">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="radio-buttons-group"
                                        name="radio-buttons-group"
                                        value={value}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel value="male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <DatePickerValue ref={pickerRef} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControlLabel
                                    control={
                                    <Checkbox value="allowExtraEmails" color="primary" />
                                    }
                                    label="I consent."
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Button href="#" onClick={gotoLogin}>
                                    Already have an account? Sign in
                                </Button>
                            </Grid>
                        </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </React.Fragment>
    )
}