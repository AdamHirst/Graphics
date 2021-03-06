import Shader from './shader/Shader';
import { mat3, mat4 } from 'gl-matrix';
import { rad } from './util/MathUtils';

export default class Program {

    /**
     * Construct a new program
     * @param {WebGLRenderingContext} gl the WebGL rendering context
     * @param {object} shaderSource contains fragment and vertex source
     */
    constructor(gl, shaderSource) {
        this.gl = gl;
        this.program = gl.createProgram();

        // Load and attach shaders
        let fragmentShader = new Shader(gl, gl.FRAGMENT_SHADER, shaderSource.fragment);
        let vertexShader = new Shader(gl, gl.VERTEX_SHADER, shaderSource.vertex);

        gl.attachShader(this.program, fragmentShader.shader);
        gl.attachShader(this.program, vertexShader.shader);

        // Link the program
        gl.linkProgram(this.program);

        // Print any errors
        let programLog = gl.getProgramInfoLog(this.program);
        if (programLog) console.log(programLog);
    }

    /**
     * returns the location of an attribute
     * @param {string} id the id of the attribute
     */
    attrib(id) {
        return this.gl.getAttribLocation(this.program, id);
    }

    /**
     * returns the location of a uniform
     * @param {string} id the id of the uniform
     */
    uniform(id) {
        return this.gl.getUniformLocation(this.program, id);
    }

    predraw(camera, time = 0) {
        this.gl.useProgram(this.program);

        let aspectRatio = this.gl.canvas.clientWidth / this.gl.canvas.clientHeight;
        
        let modelViewMatrix = camera.getView();
        let normalMatrix = mat4.create();
        // let normalMatrix = mat3.create();
        // mat3.invert(normalMatrix, modelViewMatrix);
        // mat3.transpose(normalMatrix, normalMatrix);
        this.gl.uniformMatrix4fv(this.uniform('uProjectionMatrix'), false, camera.getProjection(aspectRatio));
        this.gl.uniformMatrix4fv(this.uniform('uNormalMatrix'), false, normalMatrix);
        this.gl.uniformMatrix4fv(this.uniform('uModelViewMatrix'), false, modelViewMatrix);
        
        this.gl.useProgram(null);
    }

}