import { AppBar, Box, Button, Typography } from "@mui/material";

export default function Header({ locname }: { locname?: string }) {
    return (
        <AppBar position="sticky" sx={{ maxWidth: "90%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between", px: 2, py: 0.1, minHeight: "fit-content", borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} >
            <span className="display: flex">
                <Box component="img" src="../../logo_alt.svg" sx={{ maxHeight: 50 }} />
                <Button variant="outlined" sx={{ borderBottomColor: "primary.light", color: "primary.contrastText", borderBottomWidth: 3, borderRadius: 0 }}>Test</Button>
                <Button variant="outlined" sx={{ borderBottomColor: "primary.light", color: "primary.contrastText", borderBottomWidth: 3, borderRadius: 0 }}>Test</Button>
            </span>
            <Typography variant="h6">{/* className="mt-2 text-sm font-medium uppercase tracking-widest text-gray-200" */}
                {locname}
            </Typography>
        </AppBar>
    );
}

// sx={{py:1, px: 4, display: "flex", bgcolor: "primary.dark" }}