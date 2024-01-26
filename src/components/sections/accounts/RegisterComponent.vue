<template>
    <base-card mode="normal">
        <form>
            <div class="upper-container">
                <div class="header">
                    <h3>Registration Account</h3>
                    
                    <input type="checkbox" >


                </div>

                <div class="name">
                    <div class="form-control">
                        <label for="firstName">First Name</label>
                        <input type="text" name="firstName" id="firstName" placeholder="First Name">
                    </div>
                    <div class="form-control">
                        <label for="lastName">Last Name</label>
                        <input type="text" name="lastName" id="lastName" placeholder="Last Name">
                    </div>
                </div>

                <div class="name">
                    <div class="form-control">
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Email">
                    </div>
                    <div class="form-control">
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password">
                    </div>
                </div>
                <div class="form-control">
                    <label for="phoneNumber">Phone Number</label>
                    <input type="number" name="phoneNumber" id="phoneNumber" placeholder="Phone Number">
                </div>
            </div>

            <div class="lower-container">
                <button>Continue</button>
                <p>---------- Already have an account? ----------</p>
                <p>If you already have an account, please login</p>
            </div>

        </form>

    </base-card>
</template>

<style scoped>
.upper-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.header{
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: space-between;
}


.name {
    display: flex;
    flex-direction: row;
    gap: 10px;
}

.form-control {
    display: flex;
    flex-direction: column;
    margin: 10px 0;
}

input {
    height: 30px;
    width: 300px;
    padding: 5px;
    border-width: 1px;
    border-radius: 5px;
    border-color: #ccc;
}

.lower-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}

button {
    padding: 12px;
    width: 300px;

}
</style>