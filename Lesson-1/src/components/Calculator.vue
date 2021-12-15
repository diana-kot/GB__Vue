<template>
    <div>
        <div class="display">
            <input v-model.number="operand1" type="number" />
            <input v-model.number="operand2" type="number" />
            <span class="display__rav">=</span> <span class="display__span">{{ result }}</span> 
        </div>
        <div class="grid">
            <button @click="enterNum(item)" class="cell num" v-for="(item, index) in myColaction" :key="index">
            {{ item }}</button>
        </div>
        <div class="keyboard">
            <button v-for="operand in operands"
            :key="operand"
            @click="calculate(operand)"
            :title="operand"
            :disabled="operand === '/' && coperand2 === 0"
            >{{ operand }}
            </button>
            <button @click="calculate('x2')">X&sup2;</button>
            <button @click="calculate('divides')">&divide;</button>
        </div>
    </div>
</template>

<script>
export default {
    name: "Calculator",
    data() {
        return {
            myColaction:[1,2,3,4,5,6,7,8,9,0],
            operands: ['+','-','/','*'],
            operand1:0,
            operand2:0,
            result:0
        }
    },

    methods: {
        calculate(operation = "+") {
            switch (operation) {
                case "+":
                    this.summ();
                    break;
                case "-":
                    this.substruct();
                    break;
                case "/":
                    this.divide();
                    break;
                case "*":
                    this.myltipiy();
                    break;
                case "x2":
                    this.enterSign();
                    break;
                case "divides":
                    this.divides();
                    break;

            }
        },
 
        summ (){
            this.result = this.operand1 + this.operand2
        },
        substruct (){
            this.result = this.operand1 - this.operand2
        },
        divide(){
            if (this.operand2 > 0) {
                this.result = this.operand1 / this.operand2
            } else {
                this.result = 'На ноль делить нельзя!'
            }
        },
        myltipiy () {
            this.result = this.operand1 * this.operand2
        },

        enterSign () {
            this.result = Math.pow(parseFloat(this.operand1), parseFloat(this.operand2));
        },

        divides () {
            if (this.operand2 > 0) {
                this.result =  (parseFloat(this.operand1) - parseFloat(this.operand1) % parseFloat(this.operand2)) / parseFloat(this.operand2);
            
            } else {
                this.result = 'На ноль делить нельзя!'
            }
        }
    }
}
</script>

<style>
    .keyboard {
    display: flex;                       
    flex-wrap: wrap;  
    justify-content: center;
    align-items: center;
    width: 100%;
    gap: 20px;
}

button {
    width: 100px;
    border: 0;
    color: #243849;
    font-size: 28px;
    padding: 5px 5px;
    text-align: center;
}

button:hover {
    color: #072d4e;
    box-shadow: inset 0 0 0 3px #3a7999;
}

input, .display__span {
    text-align: left;
    outline: none;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    margin-bottom: 40px;
    text-align: center;
    background: #F6F6f6;
    border: 1px solid #cecece;
    padding: 6px 0 4px 10px;
    font-size: 20px;
    font-family: Arial;
    border-radius: 8px;
    resize: none;
    padding: 5px;
    flex-grow: 1;

    width: 200px;
    margin-bottom: 15px;
    border-radius: 8px;
    resize: none;
    padding: 10px;
    overflow: hidden;
    box-sizing: border-box;
    height: 45px;
    min-height: 45px;
    width: 200px;
    min-width: 200px;
    margin-bottom: 15px;
}
    

input:hover {
    color: #072d4e;
    box-shadow: inset 0 0 0 3px #3a7999;
}

.display {
    display: flex;
    gap: 20px;
    align-items: center;
    }
.display__rav {
    font-size: 13px;
	padding: 6px 10px 4px 10px;
	border: 1px solid #cecece;
	background: #F6F6f6;
	border-radius: 8px;
    margin-bottom: 40px;
    text-align: center;
}
.num {
    background-color: #2b3f31;
    display: flex;
    flex: 1 1 20px;  
    margin-bottom: 15px;
    font-weight: 800;
    background: #F6F6f6;
    border: 1px solid #cecece;
    align-items: center;
    justify-content: center;

}
.cell {
    height: 45px;
    font-size: 18px;
}
.grid {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

</style>