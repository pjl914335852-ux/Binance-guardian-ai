// Voice Handler - 语音识别和生成
// 使用 OpenAI Whisper (语音转文字) 和 TTS (文字转语音)

const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
const https = require('https');

class VoiceHandler {
  constructor(apiKey) {
    if (!apiKey) {
      throw new Error('OpenAI API Key is required');
    }
    
    this.openai = new OpenAI({
      apiKey: apiKey
    });
    
    this.tempDir = path.join(__dirname, 'temp');
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }
  }
  
  /**
   * 下载 Telegram 语音文件
   * @param {string} fileUrl - Telegram 文件 URL
   * @param {string} outputPath - 输出路径
   */
  async downloadFile(fileUrl, outputPath) {
    return new Promise((resolve, reject) => {
      const file = fs.createWriteStream(outputPath);
      https.get(fileUrl, (response) => {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(outputPath);
        });
      }).on('error', (err) => {
        fs.unlink(outputPath, () => {});
        reject(err);
      });
    });
  }
  
  /**
   * 语音转文字 (Whisper)
   * @param {string} audioPath - 音频文件路径
   * @param {string} language - 语言代码 (zh/en)
   * @returns {Promise<string>} 识别的文字
   */
  async speechToText(audioPath, language = 'zh') {
    try {
      console.log(`🎙️ 正在识别语音: ${audioPath}`);
      
      const transcription = await this.openai.audio.transcriptions.create({
        file: fs.createReadStream(audioPath),
        model: "whisper-1",
        language: language,
        response_format: "text"
      });
      
      console.log(`✅ 识别成功: ${transcription}`);
      return transcription;
      
    } catch (error) {
      console.error('❌ 语音识别失败:', error.message);
      throw error;
    }
  }
  
  /**
   * 文字转语音 (TTS)
   * @param {string} text - 要转换的文字
   * @param {string} language - 语言 (zh/en)
   * @param {string} outputPath - 输出文件路径
   * @returns {Promise<string>} 生成的音频文件路径
   */
  async textToSpeech(text, language = 'zh', outputPath = null) {
    try {
      console.log(`🔊 正在生成语音: ${text.substring(0, 50)}...`);
      
      // 根据语言选择声音
      const voice = language === 'zh' ? 'nova' : 'alloy';
      
      if (!outputPath) {
        const timestamp = Date.now();
        outputPath = path.join(this.tempDir, `tts_${timestamp}.mp3`);
      }
      
      const mp3 = await this.openai.audio.speech.create({
        model: "tts-1",
        voice: voice,
        input: text,
        speed: 1.0
      });
      
      const buffer = Buffer.from(await mp3.arrayBuffer());
      fs.writeFileSync(outputPath, buffer);
      
      console.log(`✅ 语音生成成功: ${outputPath}`);
      return outputPath;
      
    } catch (error) {
      console.error('❌ 语音生成失败:', error.message);
      throw error;
    }
  }
  
  /**
   * 清理临时文件
   * @param {string} filePath - 文件路径
   */
  cleanupFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`🗑️ 已清理临时文件: ${filePath}`);
      }
    } catch (error) {
      console.error('清理文件失败:', error.message);
    }
  }
  
  /**
   * 清理所有临时文件（超过 1 小时的）
   */
  cleanupOldFiles() {
    try {
      const files = fs.readdirSync(this.tempDir);
      const now = Date.now();
      const oneHour = 60 * 60 * 1000;
      
      files.forEach(file => {
        const filePath = path.join(this.tempDir, file);
        const stats = fs.statSync(filePath);
        
        if (now - stats.mtimeMs > oneHour) {
          fs.unlinkSync(filePath);
          console.log(`🗑️ 已清理旧文件: ${file}`);
        }
      });
    } catch (error) {
      console.error('清理旧文件失败:', error.message);
    }
  }
}

module.exports = VoiceHandler;
