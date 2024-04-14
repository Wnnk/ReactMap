import { Form, ColorPicker, Input, Slider, Select, Button } from 'antd';
export const TextType = ({changeFreeLine}) =>{
    const option = [
        {value:'serif', label:' 宋体'},
    ];
    return (
        <>
            <div>
                <h3>文字类型</h3>
                <Form
                    layout="vertical"
                    onFinish={(values) => {changeFreeLine('text',values.text);changeFreeLine("type","text");changeFreeLine('isDrawing',true)}}
                >
                    <Form.Item name="text" rules={[{ required: true, message: '请输入文字内容' }]} label="文字内容">
                        <Input placeholder='请输入文字内容'/>
                    </Form.Item>

                    <Form.Item label="字体颜色">
                        <ColorPicker defaultValue="#000" defaultFormat ="rgb" onChangeComplete={(color) =>{changeFreeLine('textColor',`${color.toHexString()}`)}}/>
                    </Form.Item>
                    <Form.Item label="字体大小">
                    <Slider defaultValue={16} min={16} max={50}  onChange={(value) =>{changeFreeLine('textSize',value)}} />
                    </Form.Item>

                    <Form.Item label="字体样式">
                        <Select 
                            defaultValue={option[0].label}
                            options={option}
                            onChange={(value) => {changeFreeLine('textFont',value)}}
                        ></Select>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" >确定字体绘制</Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
};