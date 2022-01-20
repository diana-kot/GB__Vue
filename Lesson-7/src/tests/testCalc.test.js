import {mount} from '@vue/test-utils'
import regeneratorRuntime from "regenerator-runtime";
import Calculator from '../components/Calculator.vue'


describe('Calculator', () => {
    it('test first operand input value', () => {
        const wrapepr = mount(Calculator)
        const operand1 = wrapepr.find("input[name=operand1]")
        operand1.setValue('1')
        expect(wrapepr.vm.operand1).toBe(1)
    }),

    it('test second operand input value', () => {
        const wrapepr = mount(Calculator)
        const operand2 = wrapepr.find("input[name=operand2]")
        // operand2.setValue('2')
        operand2.element.value = "1"
        operand2.trigger('input')
        expect(wrapepr.vm.operand2).toBe(1)
    }),

    it('Test +', () => {
        const wrapepr = mount(Calculator)


        const operand1 = wrapepr.find("input[name=operand1]")
        operand1.setValue('5')
        expect(wrapepr.vm.operand1).toBe(5)


        const operand2 = wrapepr.find("input[name=operand2]")
        operand2.setValue('5')
        expect(wrapepr.vm.operand2).toBe(5)

        const sumBtn = wrapepr.find('button[name="+"]')
        sumBtn.trigger('click')

        expect(wrapepr.vm.result).toBe(10)

    }),


    it('Test -', () => {
        const wrapepr = mount(Calculator)

        const operand1 = wrapepr.find("input[name=operand1]")
        operand1.setValue('10')
        expect(wrapepr.vm.operand1).toBe(10)

        const operand2 = wrapepr.find("input[name=operand2]")
        operand2.setValue('5')
        expect(wrapepr.vm.operand2).toBe(5)

        const sumBtn = wrapepr.find('button[name="-"]')
        sumBtn.trigger('click')

        expect(wrapepr.vm.result).toBe(5)

    }),

    it('Test method *', () => {
        const wrapepr = mount(Calculator)
        const operand1 = wrapepr.find("input[name=operand1]")
        operand1.setValue('10')

        const operand2 = wrapepr.find("input[name=operand2]")
        operand2.setValue('5')

        const Btn = wrapepr.find('button[name="*"]')
        Btn.trigger('click')

        expect(wrapepr.vm.result).toBe(50)
    }),
    it('Test Keyboard opend', async () => {
        const wrapper = mount(Calculator)
        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.setChecked()

        const Keyboard = wrapper.find('div[class="keyBoard"]')
        expect(Keyboard.exists()).toBe(true)
    }),

    it('Test method /', () => {
        const wrapepr = mount(Calculator)
        const operand1 = wrapepr.find("input[name=operand1]")
        operand1.setValue('10')

        const operand2 = wrapepr.find("input[name=operand2]")
        operand2.setValue('5')

        const Btn = wrapepr.find('button[name="/"]')
        Btn.trigger('click')

        expect(wrapepr.vm.result).toBe(2)
    }),
    it('Test operands radio checked', async ()=> {
        const wrapper = mount(Calculator)
         const checkbox = wrapper.find('input[type="checkbox"]')
            await checkbox.setChecked()

        const OpRadio1 = wrapper.find('input[name="radioOp1"]')
        await OpRadio1.setChecked()

        const key0 = wrapper.find('button')
        key0.trigger('click', {button: '0'})

        
        expect(wrapper.vm.operand1).toBe(0)
      


        const OpRadio2 = wrapper.find('input[name="radioOp2"]')
        await OpRadio2.setChecked()

        const key8 = wrapper.find('button')
        key8.trigger('click', {button: '0'})

        expect(wrapper.vm.operand2).toBe(0)

    }),
    it('Tecst eraseOne', async ()=> {
        const wrapper = mount(Calculator)
        const checkbox = wrapper.find('input[type="checkbox"]')
        await checkbox.setChecked()

        const operandRadio2 = wrapper.find('input[name="radioOp2"]')
        await operandRadio2.setChecked()

        wrapper.vm.operand2 = "555"

        const keyboardItemClear = wrapper.find('button.E')
        keyboardItemClear.trigger('click')

        expect(wrapper.vm.operand2).toBe(55)

        const operandRadio1 = wrapper.find('input[name="radioOp1"]')
        await operandRadio1.setChecked()

        wrapper.vm.operand1 = "81"

        keyboardItemClear.trigger('click')

        expect(wrapper.vm.operand1).toBe(8)

    })
})