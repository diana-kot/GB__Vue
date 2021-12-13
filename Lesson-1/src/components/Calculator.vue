<template>
    <div>
        <div class="display">
            <input v-model.number="operand1" type="number" />
            <input v-model.number="operand2" type="number" />
            <span class="display__rav">=</span> <span class="display__span">{{ result }}</span> 
        </div>
        <div class="keyboard">
            <button @click="result = operand1 + operand2">+</button>
            <button @click="result = operand1 - operand2">-</button>
            <button @click="divide">/</button>
            <button @click="myltipiy(operand1, operand2)">*</button>
           <button @click="enterSign(operand1, operand2)">X&sup2;</button>
           <button @click="divides(operand1, operand2)">&divide;</button>
           
           
            
        </div>
    </div>

</template>

<script>
export default {
    name: "Calculator",
    data() {
        return {
            operand1:0,
            operand2:0,
            result:0,
            

        }
    },
    methods: {
        divide(){
            if (this.operand2 > 0) {
                this.result = this.operand1 / this.operand2
            } else {
                this.result = 'На ноль делить нельзя!'
            }
        },
        myltipiy (operand1, operand2) {
            this.result = operand1 * operand2
        },
        enterSign (operand1, operand2) {
            this.result = Math.pow(parseFloat(operand1), parseFloat(operand2));
        },

        divides (operand1, operand2) {
            if (operand2 > 0) {
                this.result =  (parseFloat(operand1) - parseFloat(operand1) % parseFloat(operand2)) / parseFloat(operand2);
            
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

</style>